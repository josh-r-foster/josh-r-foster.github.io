          // Self-contained indifference curve renderer
          (function () {
            const CANVAS_ID = 'indifference-canvas';
            const DATA_URL = 'data/indifference_grid.json';

            // Design tokens (matching presentation CSS)
            const COLORS = {
              iveyGreen: '#034638',
              westernPurple: '#4F2683',
              ink: '#000000',
              inkSoft: '#63666A',
              rule: '#A8A99E',
              bgAlt: '#f3f2ee',
            };

            // RdBu diverging colormap (11-step)
            const RDBU = [
              [103, 0, 31], [178, 24, 43], [214, 96, 77], [244, 165, 130], [253, 219, 199],
              [247, 247, 247],
              [209, 229, 240], [146, 197, 222], [67, 147, 195], [33, 102, 172], [5, 48, 97]
            ];

            function lerpColor(a, b, t) {
              return [
                Math.round(a[0] + (b[0] - a[0]) * t),
                Math.round(a[1] + (b[1] - a[1]) * t),
                Math.round(a[2] + (b[2] - a[2]) * t)
              ];
            }

            function scoreToColor(val, maxVal) {
              // Map [-maxVal, +maxVal] to [0, 1] for colormap lookup
              // Positive score = prefers grid = red; negative = prefers base = blue
              let t = 0.5 - (val / (2 * maxVal));  // invert: positive→red (low index)
              t = Math.max(0, Math.min(1, t));
              const idx = t * (RDBU.length - 1);
              const lo = Math.floor(idx);
              const hi = Math.min(lo + 1, RDBU.length - 1);
              const frac = idx - lo;
              const c = lerpColor(RDBU[lo], RDBU[hi], frac);
              return `rgb(${c[0]},${c[1]},${c[2]})`;
            }

            // Marching squares contour extraction for level=0
            function extractContourSegments(sigma, mu, scores, level) {
              const segments = [];
              const nMu = scores.length;
              const nSigma = scores[0].length;

              for (let i = 0; i < nMu - 1; i++) {
                for (let j = 0; j < nSigma - 1; j++) {
                  const v00 = scores[i][j];
                  const v10 = scores[i + 1][j];
                  const v01 = scores[i][j + 1];
                  const v11 = scores[i + 1][j + 1];

                  if (v00 == null || v10 == null || v01 == null || v11 == null) continue;

                  const b00 = v00 >= level ? 1 : 0;
                  const b10 = v10 >= level ? 1 : 0;
                  const b01 = v01 >= level ? 1 : 0;
                  const b11 = v11 >= level ? 1 : 0;
                  const cellCase = b00 | (b01 << 1) | (b11 << 2) | (b10 << 3);

                  if (cellCase === 0 || cellCase === 15) continue;

                  const s0 = sigma[j], s1 = sigma[j + 1];
                  const m0 = mu[i], m1 = mu[i + 1];

                  function interpH(va, vb, ca, cb) {
                    const t = (level - va) / (vb - va);
                    return ca + t * (cb - ca);
                  }

                  // Edge midpoints via linear interpolation
                  const top = { sigma: interpH(v00, v01, s0, s1), mu: m0 };
                  const bottom = { sigma: interpH(v10, v11, s0, s1), mu: m1 };
                  const left = { sigma: s0, mu: interpH(v00, v10, m0, m1) };
                  const right = { sigma: s1, mu: interpH(v01, v11, m0, m1) };

                  const edgePairs = {
                    1: [[left, top]],
                    2: [[top, right]],
                    3: [[left, right]],
                    4: [[right, bottom]],
                    5: [[left, bottom], [top, right]],  // saddle
                    6: [[top, bottom]],
                    7: [[left, bottom]],
                    8: [[bottom, left]],
                    9: [[bottom, top]],
                    10: [[left, top], [right, bottom]],  // saddle
                    11: [[right, bottom]],
                    12: [[right, left]],
                    13: [[top, right]],
                    14: [[top, left]],
                  };

                  const pairs = edgePairs[cellCase];
                  if (pairs) {
                    for (const [a, b] of pairs) {
                      segments.push(a, b);
                    }
                  }
                }
              }
              return segments;
            }

            function render(data) {
              const canvas = document.getElementById(CANVAS_ID);
              if (!canvas) return;
              const ctx = canvas.getContext('2d');
              const W = canvas.width;
              const H = canvas.height;

              const { sigma, mu, scores, base_mu, base_sigma } = data;
              const nSigma = sigma.length;
              const nMu = mu.length;

              // Plot area margins
              const margin = { top: 24, right: 120, bottom: 64, left: 80 };
              const plotW = W - margin.left - margin.right;
              const plotH = H - margin.top - margin.bottom;

              const sigmaMin = sigma[0], sigmaMax = sigma[nSigma - 1];
              const muMin = mu[0], muMax = mu[nMu - 1];

              function toX(s) { return margin.left + ((s - sigmaMin) / (sigmaMax - sigmaMin)) * plotW; }
              function toY(m) { return margin.top + plotH - ((m - muMin) / (muMax - muMin)) * plotH; }

              // Clear
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, W, H);

              // --- Grid lines ---
              ctx.strokeStyle = COLORS.bgAlt;
              ctx.lineWidth = 1;
              // Vertical grid lines (sigma ticks)
              for (let s = Math.ceil(sigmaMin / 5) * 5; s <= sigmaMax; s += 5) {
                const x = toX(s);
                ctx.beginPath(); ctx.moveTo(x, margin.top); ctx.lineTo(x, margin.top + plotH); ctx.stroke();
              }
              // Horizontal grid lines (mu ticks)
              for (let m = Math.ceil(muMin / 2) * 2; m <= muMax; m += 2) {
                const y = toY(m);
                ctx.beginPath(); ctx.moveTo(margin.left, y); ctx.lineTo(margin.left + plotW, y); ctx.stroke();
              }

              // --- Heatmap ---
              const maxVal = Math.max(0.1, ...scores.flat().filter(v => v != null).map(Math.abs));
              const cellW = plotW / (nSigma - 1);
              const cellH = plotH / (nMu - 1);

              for (let i = 0; i < nMu; i++) {
                for (let j = 0; j < nSigma; j++) {
                  const val = scores[i][j];
                  if (val == null) continue;
                  const x = toX(sigma[j]) - cellW / 2;
                  const y = toY(mu[i]) - cellH / 2;
                  ctx.fillStyle = scoreToColor(val, maxVal);
                  ctx.globalAlpha = 0.85;
                  ctx.fillRect(x, y, cellW + 0.5, cellH + 0.5);
                }
              }
              ctx.globalAlpha = 1.0;

              // --- Contour (Δz = 0) ---
              const segments = extractContourSegments(sigma, mu, scores, 0.0);
              ctx.strokeStyle = COLORS.iveyGreen;
              ctx.lineWidth = 3.5;
              ctx.lineCap = 'round';
              for (let k = 0; k < segments.length; k += 2) {
                const a = segments[k];
                const b = segments[k + 1];
                ctx.beginPath();
                ctx.moveTo(toX(a.sigma), toY(a.mu));
                ctx.lineTo(toX(b.sigma), toY(b.mu));
                ctx.stroke();
              }

              // --- Base bundle marker ---
              const bx = toX(base_sigma);
              const by = toY(base_mu);
              // Outer glow
              ctx.beginPath();
              ctx.arc(bx, by, 14, 0, 2 * Math.PI);
              ctx.fillStyle = 'rgba(79, 38, 131, 0.18)';
              ctx.fill();
              // Dot
              ctx.beginPath();
              ctx.arc(bx, by, 8, 0, 2 * Math.PI);
              ctx.fillStyle = COLORS.westernPurple;
              ctx.fill();
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 2;
              ctx.stroke();

              // --- Axes ---
              ctx.strokeStyle = COLORS.ink;
              ctx.lineWidth = 2;
              // x-axis
              ctx.beginPath();
              ctx.moveTo(margin.left, margin.top + plotH);
              ctx.lineTo(margin.left + plotW, margin.top + plotH);
              ctx.stroke();
              // y-axis
              ctx.beginPath();
              ctx.moveTo(margin.left, margin.top);
              ctx.lineTo(margin.left, margin.top + plotH);
              ctx.stroke();

              // --- Tick labels ---
              ctx.fillStyle = COLORS.inkSoft;
              ctx.font = '500 18px Arial, Helvetica, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'top';
              for (let s = Math.ceil(sigmaMin / 5) * 5; s <= sigmaMax; s += 5) {
                const x = toX(s);
                ctx.fillText(s.toString(), x, margin.top + plotH + 8);
              }
              ctx.textAlign = 'right';
              ctx.textBaseline = 'middle';
              for (let m = Math.ceil(muMin / 2) * 2; m <= muMax; m += 2) {
                const y = toY(m);
                ctx.fillText(m.toString(), margin.left - 12, y);
              }

              // --- Axis labels ---
              ctx.fillStyle = COLORS.ink;
              ctx.font = 'bold italic 24px Arial, Helvetica, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'top';
              ctx.fillText('σ  (Risk)', margin.left + plotW / 2, margin.top + plotH + 32);

              ctx.save();
              ctx.translate(24, margin.top + plotH / 2);
              ctx.rotate(-Math.PI / 2);
              ctx.textBaseline = 'middle';
              ctx.fillText('μ  (Expected Return)', 0, 0);
              ctx.restore();

              // --- Color bar ---
              const barX = margin.left + plotW + 16;
              const barW = 18;
              const barTop = margin.top;
              const barH = plotH;
              for (let py = 0; py < barH; py++) {
                const t = py / barH;  // 0 = top (high mu = red), 1 = bottom (blue)
                const val = maxVal * (1 - 2 * t);
                ctx.fillStyle = scoreToColor(val, maxVal);
                ctx.fillRect(barX, barTop + py, barW, 1.5);
              }
              ctx.strokeStyle = COLORS.rule;
              ctx.lineWidth = 1;
              ctx.strokeRect(barX, barTop, barW, barH);

              // Color bar labels
              ctx.fillStyle = COLORS.inkSoft;
              ctx.font = '500 14px Arial, Helvetica, sans-serif';
              ctx.textAlign = 'left';
              ctx.textBaseline = 'top';
              ctx.fillText('+' + maxVal.toFixed(1), barX + barW + 6, barTop - 2);
              ctx.textBaseline = 'middle';
              ctx.fillText('0', barX + barW + 6, barTop + barH / 2);
              ctx.textBaseline = 'bottom';
              ctx.fillText('−' + maxVal.toFixed(1), barX + barW + 6, barTop + barH + 2);

              // Color bar title (rotated)
              ctx.save();
              ctx.fillStyle = COLORS.inkSoft;
              ctx.font = '500 14px Arial, Helvetica, sans-serif';
              ctx.translate(barX + barW + 48, barTop + barH / 2);
              ctx.rotate(-Math.PI / 2);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('Δz  (logit gap)', 0, 0);
              ctx.restore();
            }

            // Load data and render when the slide becomes visible
            let dataCache = null;

            function loadAndRender() {
              if (dataCache) {
                render(dataCache);
                return;
              }
              fetch(DATA_URL)
                .then(r => r.json())
                .then(d => { dataCache = d; render(d); })
                .catch(e => console.error('Indifference grid load error:', e));
            }

            // Render on DOMContentLoaded and on slide change
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', () => {
                setTimeout(loadAndRender, 200);
              });
            } else {
              setTimeout(loadAndRender, 200);
            }

            // Re-render when navigating to the slide (Reveal event)
            if (typeof Reveal !== 'undefined') {
              Reveal.on('slidechanged', (evt) => {
                if (evt.currentSlide && evt.currentSlide.querySelector('#' + CANVAS_ID)) {
                  setTimeout(loadAndRender, 50);
                }
              });
            } else {
              document.addEventListener('DOMContentLoaded', () => {
                if (typeof Reveal !== 'undefined') {
                  Reveal.on('slidechanged', (evt) => {
                    if (evt.currentSlide && evt.currentSlide.querySelector('#' + CANVAS_ID)) {
                      setTimeout(loadAndRender, 50);
                    }
                  });
                }
              });
            }
          })();
