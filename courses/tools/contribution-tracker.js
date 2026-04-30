function makeTemplate() {
  document.getElementById("names-prompt").style.display = "none";

  const names0 = document.getElementById("names").value.split(";"); 
  names = names0.map(s => s.trim()); 
  names.forEach(function(element) {
    if(element=='') {
      const index = names.indexOf(element);
      names.splice(index,1);
    }
  });
  const numStudents = names.length;

  var points = new Array(numStudents).fill(0);

  var b = document.getElementById("students");

  for (var i = 0, len = numStudents; i < len; i++) {
    (function(index){
      let btn = document.createElement("button");
      btn.setAttribute("class", "button student");
      btn.innerHTML = names[index]+"<br><br>";
      let spn = document.createElement("span");
      spn.setAttribute("class","score");
      btn.appendChild(spn);
      b.appendChild(btn);
    })(i);
  }

  function addValue() {
    var e = document.querySelectorAll('.score')
    e.forEach((el, index) => {
        el.textContent = points[index]
    });
  }

  (function() {
      addValue();
  })()

  const students = document.getElementById('students').children.length;
  var points = new Array(students).fill(0);

  var g = document.getElementById('students');
  for (var i = 0, len = g.children.length; i < len; i++) {
    (function(index){
        g.children[i].onclick = function(){
          points[index] = points[index]+1;
          addValue();
        }    
    })(i);
  }

  document.getElementById("export-button").style.display = "block";
}

function export2txt() {
  var scoreData = [];

  var g = document.getElementById('students');
  var points = new Array(g.children.length).fill(0);
  var e = document.querySelectorAll('.score');
  e.forEach((el, index) => {
      points[index] = el.innerHTML
  });

  scoreData.push(["Name","Points"])
  for (var i = 0, len = g.children.length; i < len; i++) {
      scoreData.push([
          g.children[i].innerText.split('\n')[0],
          points[i]
      ]);
  }

  let csvContent = "data:text/csv;charset=utf-8," 
    + scoreData.map(e => e.join(",")).join("\n");

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  const d = new Date();
  date = d.toLocaleString('default', { month: 'long', day:'numeric', year:'numeric' });
  link.setAttribute("download", "Contributions for "+date+".txt");
  document.body.appendChild(link); // Required for FF

  link.click()
}
