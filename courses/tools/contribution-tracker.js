(function () {
  "use strict";

  const APP_VERSION = 2;
  const STORAGE_PREFIX = "ivey-contribution-tracker:v2";
  const config = window.CONTRIBUTION_TRACKER_CONFIG;

  const elements = {
    appTitle: document.getElementById("app-title"),
    saveStatus: document.getElementById("save-status"),
    setupPanel: document.getElementById("setup-panel"),
    setupForm: document.getElementById("setup-form"),
    modeSelect: document.getElementById("mode-select"),
    courseSelect: document.getElementById("course-select"),
    sessionDate: document.getElementById("session-date"),
    reviewerField: document.getElementById("reviewer-field"),
    reviewerName: document.getElementById("reviewer-name"),
    rosterDetails: document.getElementById("roster-details"),
    customRoster: document.getElementById("custom-roster"),
    setupImportButton: document.getElementById("setup-import-button"),
    trackerPanel: document.getElementById("tracker-panel"),
    workspaceTitle: document.getElementById("workspace-title"),
    sessionLabel: document.getElementById("session-label"),
    totalCount: document.getElementById("total-count"),
    peerInstructions: document.getElementById("peer-instructions"),
    studentSearch: document.getElementById("student-search"),
    sortSelect: document.getElementById("sort-select"),
    undoButton: document.getElementById("undo-button"),
    changeSessionButton: document.getElementById("change-session-button"),
    emptyResults: document.getElementById("empty-results"),
    personContainer: document.getElementById("person-container"),
    actionTitle: document.getElementById("action-title"),
    actionDescription: document.getElementById("action-description"),
    importButton: document.getElementById("import-button"),
    csvButton: document.getElementById("csv-button"),
    exportButton: document.getElementById("export-button"),
    resetButton: document.getElementById("reset-button"),
    importFile: document.getElementById("import-file"),
    toast: document.getElementById("toast")
  };

  let state = null;
  let history = [];
  let toastTimer = null;
  let feedbackSaveTimer = null;

  function localDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60 * 1000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 10);
  }

  function slugify(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "session";
  }

  function hashText(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function parseRoster(value) {
    const seen = new Set();
    return String(value || "")
      .split(/[;\n]/)
      .map((name) => name.trim())
      .filter(Boolean)
      .filter((name) => {
        const key = name.toLocaleLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }

  function makeStorageKey(mode, courseId, sessionDate, reviewerName, roster) {
    const rosterSignature = hashText(roster.join("\n"));
    const reviewer = mode === "peer" ? slugify(reviewerName || "anonymous") : "instructor";
    return [STORAGE_PREFIX, mode, courseId, sessionDate, reviewer, rosterSignature].join(":");
  }

  function studentId(name, index) {
    return `${slugify(name)}-${index + 1}`;
  }

  function blankTags() {
    return Object.fromEntries(config.rubric.map((item) => [item.id, false]));
  }

  function createState(options) {
    const courseConfig = config.courses[options.courseId];
    const course = courseConfig
      ? {
          id: options.courseId,
          code: courseConfig.code,
          section: courseConfig.section || "",
          label: courseConfig.label
        }
      : {
          id: "custom",
          code: "Custom",
          section: "",
          label: "Custom roster"
        };
    const now = new Date().toISOString();

    return {
      schemaVersion: APP_VERSION,
      mode: options.mode,
      course,
      sessionDate: options.sessionDate,
      reviewerName: options.reviewerName || "",
      createdAt: now,
      updatedAt: now,
      rubric: config.rubric,
      students: options.roster.map((name, index) => ({
        id: studentId(name, index),
        name,
        count: 0,
        tags: blankTags(),
        feedback: ""
      })),
      storageKey: makeStorageKey(
        options.mode,
        course.id,
        options.sessionDate,
        options.reviewerName,
        options.roster
      )
    };
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      elements.toast.hidden = true;
    }, 3600);
  }

  function formatSavedTime(date) {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit"
    }).format(date);
  }

  function saveState() {
    if (!state) return;
    state.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(state.storageKey, JSON.stringify(state));
      elements.saveStatus.textContent = `Saved at ${formatSavedTime(new Date())}`;
    } catch (error) {
      elements.saveStatus.textContent = "Could not save in this browser";
    }
  }

  function findSavedState(storageKey) {
    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return null;
      return normaliseState(JSON.parse(stored));
    } catch (error) {
      return null;
    }
  }

  function normaliseStudent(student, index) {
    const tags = blankTags();
    if (student.tags && typeof student.tags === "object") {
      config.rubric.forEach((item) => {
        tags[item.id] = Boolean(student.tags[item.id]);
      });
    } else if (Array.isArray(student.buttons)) {
      student.buttons.forEach((button) => {
        const rubricItem = config.rubric.find((item) => item.label === button.name);
        if (rubricItem) tags[rubricItem.id] = Boolean(button.active);
      });
    }

    const name = String(student.name || student.person || "").trim();
    return {
      id: String(student.id || studentId(name, index)),
      name,
      count: Math.max(0, Number.parseInt(student.count, 10) || 0),
      tags,
      feedback: String(student.feedback || "")
    };
  }

  function normaliseState(input) {
    if (!input || typeof input !== "object" || !Array.isArray(input.students)) {
      throw new Error("This file does not contain a contribution tracker backup.");
    }

    const students = input.students.map(normaliseStudent).filter((student) => student.name);
    if (!students.length) throw new Error("The backup does not contain a roster.");

    const courseInput = input.course || {};
    const courseId = String(courseInput.id || input.courseId || "custom");
    const courseConfig = config.courses[courseId];
    const course = {
      id: courseId,
      code: String(courseInput.code || (courseConfig && courseConfig.code) || "Custom"),
      section: String(courseInput.section || (courseConfig && courseConfig.section) || ""),
      label: String(courseInput.label || (courseConfig && courseConfig.label) || courseInput.code || "Custom roster")
    };
    const mode = input.mode === "peer" ? "peer" : "instructor";
    const sessionDate = String(input.sessionDate || localDate());
    const reviewerName = String(input.reviewerName || "");

    return {
      schemaVersion: APP_VERSION,
      mode,
      course,
      sessionDate,
      reviewerName,
      createdAt: String(input.createdAt || new Date().toISOString()),
      updatedAt: String(input.updatedAt || new Date().toISOString()),
      rubric: config.rubric,
      students,
      storageKey: makeStorageKey(
        mode,
        course.id,
        sessionDate,
        reviewerName,
        students.map((student) => student.name)
      )
    };
  }

  function normaliseLegacyState(input) {
    if (!Array.isArray(input) || !input.length) {
      throw new Error("This file does not contain contribution data.");
    }

    const mode = input.some((student) => Object.prototype.hasOwnProperty.call(student, "feedback"))
      ? "peer"
      : elements.modeSelect.value;
    const selectedCourse = config.courses[elements.courseSelect.value];
    const base = createState({
      mode,
      courseId: selectedCourse ? elements.courseSelect.value : "custom",
      sessionDate: elements.sessionDate.value || localDate(),
      reviewerName: elements.reviewerName.value.trim(),
      roster: input.map((student) => String(student.person || student.name || "").trim()).filter(Boolean)
    });
    base.students = input.map(normaliseStudent).filter((student) => student.name);
    base.storageKey = makeStorageKey(
      base.mode,
      base.course.id,
      base.sessionDate,
      base.reviewerName,
      base.students.map((student) => student.name)
    );
    return base;
  }

  function getStudent(id) {
    return state.students.find((student) => student.id === id);
  }

  function commitChange(mutator) {
    history.push(clone(state));
    if (history.length > 30) history.shift();
    mutator();
    saveState();
    renderStudents();
    updateSummary();
    elements.undoButton.disabled = history.length === 0;
  }

  function initials(name) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }

  function createCounterButton(label, symbol, disabled, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = symbol;
    button.setAttribute("aria-label", label);
    button.disabled = disabled;
    button.addEventListener("click", handler);
    return button;
  }

  function createStudentCard(student) {
    const card = document.createElement("article");
    card.className = "student-card";
    card.dataset.studentId = student.id;

    const header = document.createElement("div");
    header.className = "student-card-header";

    const avatar = document.createElement("span");
    avatar.className = "student-initials";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = initials(student.name);

    const heading = document.createElement("h2");
    heading.className = "student-name";
    heading.textContent = student.name;

    const counter = document.createElement("div");
    counter.className = "counter";
    counter.setAttribute("aria-label", `${student.name} contribution count`);
    counter.appendChild(
      createCounterButton(`Remove one contribution for ${student.name}`, "−", student.count === 0, () => {
        commitChange(() => { getStudent(student.id).count -= 1; });
      })
    );

    const count = document.createElement("span");
    count.className = "count";
    count.textContent = String(student.count);
    count.setAttribute("aria-live", "polite");
    counter.appendChild(count);

    counter.appendChild(
      createCounterButton(`Add one contribution for ${student.name}`, "+", false, () => {
        commitChange(() => { getStudent(student.id).count += 1; });
      })
    );

    header.append(avatar, heading, counter);
    card.appendChild(header);

    const rubric = document.createElement("div");
    rubric.className = "rubric";
    rubric.setAttribute("aria-label", `Contribution qualities for ${student.name}`);
    state.rubric.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `rubric-button ${item.tone === "concern" ? "concern" : ""}`;
      button.textContent = item.label;
      button.setAttribute("aria-pressed", String(Boolean(student.tags[item.id])));
      button.addEventListener("click", () => {
        commitChange(() => {
          const currentStudent = getStudent(student.id);
          currentStudent.tags[item.id] = !currentStudent.tags[item.id];
        });
      });
      rubric.appendChild(button);
    });
    card.appendChild(rubric);

    if (state.mode === "peer") {
      const label = document.createElement("label");
      label.className = "feedback-field";
      label.textContent = "Constructive feedback (optional)";
      const textarea = document.createElement("textarea");
      textarea.value = student.feedback;
      textarea.placeholder = `Share a helpful observation for ${student.name}`;
      textarea.addEventListener("input", () => {
        getStudent(student.id).feedback = textarea.value;
        elements.saveStatus.textContent = "Saving…";
        window.clearTimeout(feedbackSaveTimer);
        feedbackSaveTimer = window.setTimeout(saveState, 250);
      });
      label.appendChild(textarea);
      card.appendChild(label);
    }

    return card;
  }

  function renderStudents() {
    if (!state) return;
    const query = elements.studentSearch.value.trim().toLocaleLowerCase();
    const students = state.students
      .filter((student) => student.name.toLocaleLowerCase().includes(query))
      .slice()
      .sort((first, second) => {
        if (elements.sortSelect.value === "count" && second.count !== first.count) {
          return second.count - first.count;
        }
        return first.name.localeCompare(second.name);
      });

    elements.personContainer.replaceChildren(...students.map(createStudentCard));
    elements.emptyResults.hidden = students.length !== 0;
  }

  function updateSummary() {
    const total = state.students.reduce((sum, student) => sum + student.count, 0);
    elements.totalCount.textContent = String(total);
  }

  function openTracker(nextState, resumed) {
    state = normaliseState(nextState);
    history = [];
    elements.setupPanel.hidden = true;
    elements.trackerPanel.hidden = false;
    elements.modeSelect.value = state.mode;
    elements.courseSelect.value = config.courses[state.course.id] ? state.course.id : "custom";
    elements.sessionDate.value = state.sessionDate;
    elements.reviewerName.value = state.reviewerName;
    elements.studentSearch.value = "";
    elements.sortSelect.value = "name";
    elements.undoButton.disabled = true;

    const modeLabel = state.mode === "peer" ? "Peer feedback" : "Instructor tracking";
    elements.appTitle.textContent = `${state.course.code} ${modeLabel}`;
    elements.workspaceTitle.textContent = state.mode === "peer" ? "Peer contribution feedback" : "Contribution tracker";
    elements.sessionLabel.textContent = [state.course.label, state.sessionDate, modeLabel].filter(Boolean).join(" · ");
    elements.peerInstructions.hidden = state.mode !== "peer";
    elements.actionTitle.textContent = state.mode === "peer" ? "Finish your feedback" : "Back up this session";
    elements.actionDescription.textContent = state.mode === "peer"
      ? "Download the backup, then email it to jfoster@ivey.ca."
      : "Nothing is sent automatically.";
    document.title = `${state.course.code} ${modeLabel} · Ivey`;

    renderStudents();
    updateSummary();
    saveState();
    if (resumed) showToast("Resumed your saved session.");
  }

  function startFromSetup() {
    const mode = elements.modeSelect.value;
    const courseId = elements.courseSelect.value;
    const courseConfig = config.courses[courseId];
    const customRoster = parseRoster(elements.customRoster.value);
    const roster = customRoster.length ? customRoster : ((courseConfig && courseConfig.students) || []);

    if (!roster.length) {
      elements.rosterDetails.open = true;
      elements.customRoster.focus();
      showToast("Add at least one student to the custom roster.");
      return;
    }

    const options = {
      mode,
      courseId: courseConfig ? courseId : "custom",
      sessionDate: elements.sessionDate.value || localDate(),
      reviewerName: mode === "peer" ? elements.reviewerName.value.trim() : "",
      roster
    };
    const initialState = createState(options);
    const savedState = findSavedState(initialState.storageKey);
    openTracker(savedState || initialState, Boolean(savedState));
  }

  function exportableState() {
    const output = clone(state);
    delete output.storageKey;
    return output;
  }

  function fileStem() {
    const section = state.course.section ? `-${slugify(state.course.section)}` : "";
    const reviewer = state.mode === "peer" && state.reviewerName
      ? `-${slugify(state.reviewerName)}`
      : "";
    const kind = state.mode === "peer" ? "peer-feedback" : "contributions";
    return `${slugify(state.course.code)}${section}-${state.sessionDate}-${kind}${reviewer}`;
  }

  function downloadFile(contents, mimeType, extension) {
    const blob = new Blob([contents], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileStem()}.${extension}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function escapeCsv(value) {
    const stringValue = String(value == null ? "" : value);
    return /[",\n]/.test(stringValue) ? `"${stringValue.replace(/"/g, '""')}"` : stringValue;
  }

  function exportJson() {
    saveState();
    downloadFile(`${JSON.stringify(exportableState(), null, 2)}\n`, "application/json;charset=utf-8", "json");
    showToast("Backup downloaded. Keep it somewhere safe.");
  }

  function exportCsv() {
    saveState();
    const headers = [
      "course", "section", "session_date", "mode", "reviewer", "student_id",
      "student", "count", "selected_qualities", "feedback"
    ];
    const rows = state.students.map((student) => {
      const selected = state.rubric
        .filter((item) => student.tags[item.id])
        .map((item) => item.label)
        .join("; ");
      return [
        state.course.code,
        state.course.section,
        state.sessionDate,
        state.mode,
        state.reviewerName,
        student.id,
        student.name,
        student.count,
        selected,
        state.mode === "peer" ? student.feedback : ""
      ];
    });
    const csv = [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n");
    downloadFile(`\ufeff${csv}\n`, "text/csv;charset=utf-8", "csv");
    showToast("CSV downloaded.");
  }

  function importData(input) {
    const imported = Array.isArray(input) ? normaliseLegacyState(input) : normaliseState(input);
    openTracker(imported, false);
    showToast("Backup restored and saved in this browser.");
  }

  function openImportPicker() {
    elements.importFile.value = "";
    elements.importFile.click();
  }

  function resetSession() {
    if (!window.confirm("Reset every count, selection, and note in this session? This cannot be undone.")) return;
    try { localStorage.removeItem(state.storageKey); } catch (error) { /* Storage may be unavailable. */ }
    const replacement = createState({
      mode: state.mode,
      courseId: config.courses[state.course.id] ? state.course.id : "custom",
      sessionDate: state.sessionDate,
      reviewerName: state.reviewerName,
      roster: state.students.map((student) => student.name)
    });
    openTracker(replacement, false);
    showToast("Session reset.");
  }

  function updateSetupVisibility() {
    const peerMode = elements.modeSelect.value === "peer";
    elements.reviewerField.classList.toggle("is-hidden", !peerMode);
    if (elements.courseSelect.value === "custom") elements.rosterDetails.open = true;
  }

  elements.setupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    startFromSetup();
  });
  elements.modeSelect.addEventListener("change", updateSetupVisibility);
  elements.courseSelect.addEventListener("change", updateSetupVisibility);
  elements.studentSearch.addEventListener("input", renderStudents);
  elements.sortSelect.addEventListener("change", renderStudents);
  elements.exportButton.addEventListener("click", exportJson);
  elements.csvButton.addEventListener("click", exportCsv);
  elements.importButton.addEventListener("click", openImportPicker);
  elements.setupImportButton.addEventListener("click", openImportPicker);
  elements.resetButton.addEventListener("click", resetSession);
  elements.changeSessionButton.addEventListener("click", () => {
    saveState();
    elements.trackerPanel.hidden = true;
    elements.setupPanel.hidden = false;
    elements.appTitle.textContent = "Contribution tracker";
    document.title = "Ivey Contribution Tracker";
  });
  elements.undoButton.addEventListener("click", () => {
    if (!history.length) return;
    state = normaliseState(history.pop());
    saveState();
    renderStudents();
    updateSummary();
    elements.undoButton.disabled = history.length === 0;
    showToast("Last change undone.");
  });
  elements.importFile.addEventListener("change", async () => {
    const file = elements.importFile.files[0];
    if (!file) return;
    try {
      importData(JSON.parse(await file.text()));
    } catch (error) {
      showToast(error.message || "That backup could not be restored.");
    }
  });
  document.addEventListener("keydown", (event) => {
    const editingText = ["INPUT", "TEXTAREA"].includes(document.activeElement && document.activeElement.tagName);
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z" && !editingText && history.length) {
      event.preventDefault();
      elements.undoButton.click();
    }
  });
  window.addEventListener("pagehide", saveState);

  elements.sessionDate.value = localDate();
  const params = new URLSearchParams(window.location.search);
  const requestedCourse = params.get("course");
  const requestedMode = params.get("mode");
  if (requestedCourse && config.courses[requestedCourse]) elements.courseSelect.value = requestedCourse;
  if (["instructor", "peer"].includes(requestedMode)) elements.modeSelect.value = requestedMode;
  updateSetupVisibility();

  if (requestedCourse && config.courses[requestedCourse] && ["instructor", "peer"].includes(requestedMode)) {
    startFromSetup();
  }
})();
