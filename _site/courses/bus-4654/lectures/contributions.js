const students = document.getElementById('students').children.length;
var points = new Array(students).fill(0);

function addValue() {
        var e = document.querySelectorAll('.score')
        e.forEach((el, index) => {
            el.textContent = points[index]
        });
    }

(function() {
    addValue();
})()

var g = document.getElementById('students');
for (var i = 0, len = g.children.length; i < len; i++) {
  (function(index){
      g.children[i].onclick = function(){
        points[index] = points[index]+1;
        addValue();
      }    
  })(i);
}

function export2txt() {
  var scoreData = [];
  for (var i = 0, len = g.children.length; i < len; i++) {
      scoreData.push({
          name: g.children[i].innerText.split('\n')[0],
          points: points[i]
      });
  }

  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(scoreData, null, 2)], {
    type: "text/plain"
  }));

  const d = new Date();
  date = d.toLocaleString('default', { month: 'long', day:'numeric', year:'numeric' });
  a.setAttribute("download", "Contributions for "+date+".txt");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}