---
layout:     article
title:      'Risk Preferences Over Auction Revenue'
date:       2021-07-14 10:00:00
summary:    '[working paper] Putting social preferences to work: can revealed preferences predict real effort provision?'
categories: research publication
---

Text. 

# Experimental Design

<div class="container">
	<div class="row">
		<div class="col-sm-12">
			<canvas id="outputCanvas" width="500" height="300"></canvas>
		</div>
		<div id="description"></div>
	</div>
</div>

<table>
	<thead>
		<tr>
			<th scope="col">There is a probability of...</th>
			<th scope="col">...revenue will be less than...</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-label="Prob">0%</td>
			<td id="Rev0"></td>
		</tr>
		<tr>
			<td data-label="Prob">10%</td>
			<td id="Rev10"></td>
		</tr>
		<tr>
			<td data-label="Prob">20%</td>
			<td id="Rev20"></td>
		</tr>
		<tr>
			<td data-label="Prob">30%</td>
			<td id="Rev30"></td>
		</tr>
		<tr>
			<td data-label="Prob">40%</td>
			<td id="Rev40"></td>
		</tr>
		<tr>
			<td data-label="Prob">50%</td>
			<td id="Rev50"></td>
		</tr>
		<tr>
			<td data-label="Prob">60%</td>
			<td id="Rev60"></td>
		</tr>
		<tr>
			<td data-label="Prob">70%</td>
			<td id="Rev70"></td>
		</tr>
		<tr>
			<td data-label="Prob">80%</td>
			<td id="Rev80"></td>
		</tr>
		<tr>
			<td data-label="Prob">90%</td>
			<td id="Rev90"></td>
		</tr>
		<tr>
			<td data-label="Prob">100%</td>
			<td id="Rev100"></td>
		</tr>
	</tbody>
	<thead>
		<tr>
			<th colspan="2">Average Revenue</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td colspan="2" id="avgRev"></td>
		</tr>
	</tbody>
	<thead>
		<tr>
			<th colspan="2">Median Revenue</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td colspan="2" id="medRev"></td>
		</tr>
	</tbody>
</table>

<script type="text/javascript">

  var ctx = document.getElementById("outputCanvas").getContext('2d');

  var ref = database.ref('/'); 

  ref.on('value',getData);

  function getData(data) {
    var db = data.val(); 
    var keys = Object.keys(db);

    var revenueData = [];
    var cdfData = [];
    for (var i=0;i<keys.length;i++) {
      var k = keys[i];
      if (db[k].x1==50) {
        revenueData.push({x: db[k].revenue, y: db[k].likelihood});
        cdfData.push({x: db[k].revenue, y: db[k].cdf});
      }
    }

    var revs = []; 
    var probs = [];
    var dfs = [];
    for (var i=0;i<cdfData.length;i++) {
    	revs.push(cdfData[i].x);
    	probs.push(cdfData[i].y);
    	dfs.push(revenueData[i].y); 
    }

    for (var i=0;i<=10;i++) {
    	var closest = probs.reduce(function(prev, curr) {
    		return (Math.abs(curr - i/10) < Math.abs(prev - i/10) ? curr : prev);
    	});
    	document.getElementById("Rev"+10*i).innerHTML = "$"+Math.round(revenueData[probs.indexOf(closest)].x);
    	if(i/10==1/2) {
    		document.getElementById("medRev").innerHTML = "$"+Math.round(revenueData[probs.indexOf(closest)].x);
    	}
    }
    
    var avgrev = []; 
    for (var i=0;i<cdfData.length;i++) {
    	avgrev.push(revs[i]*dfs[i]*(revs[cdfData.length-1]-revs[cdfData.length-2]));
    }
    document.getElementById("avgRev").innerHTML = "$"+Math.round(avgrev.reduce((a, b) => a + b, 0));

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        label: 'Line Dataset',
        datasets: [{
            data: revenueData,
            label: 'Revenue Data',
            backgroundColor: '#4CAF50',
            pointRadius: 0
          }], 
          lineAtIndex: 0
      },
      options: {
        title: {
          display: true,
          text: "Distribution of Revenue Potential",
          fontSize: 20
        },
        legend: {
          display: false,
        },
        animation: {
          duration: 0
        },
        showLines: true,
        showTooltips: false, 
        tooltips: {enabled: false},
        hover: {mode: null},
        events: [], 
        scales: {
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Likelihood',
              fontSize: 16
            },
            ticks: {
              beginAtZero: true,
              fontSize: 14,
              min: 0, 
              max: 0.02,
              stepSize: 0.002
            }
          }],
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Revenue',
              fontSize: 16
            },
            gridLines: {
              display: true
            },
            ticks: {
              beginAtZero: false,
              fontSize: 14,
              min: 200,
              max: 550,
              stepSize: 50
            }
          }]
        }
      }
    });
  }
</script>

<div id="slidecontainer">
	<input type="range" min="0" max="100" value="50" class="slider" id="slider1">
	<label>Auction Type A: <span id="v1"></span>%</label>
</div>
<div id="slidecontainer">
	<input type="range" min="0" max="100" value="50" class="slider" id="slider2">
	<label>Auction Type B: <span id="v2"></span>%</label>
</div>
<p id="slidecontainer">Drag the slider to adjust the amount you use a given auction type.</p>
<p id="slidecontainer">(The % used across auction types must add up to 100%.)</p>
<form >
	<input class = "button" type="button" value="Simulate" onclick="Random();" />
	<input type="text" id="revSim" /><br>
	<input class = "button" type="button" value="FINALIZE" onclick="RandomFinal();" />
	<input type="text" id="revFinal" /><br>
</form>
<script type="text/javascript">
	document.getElementById("revSim").style.fontSize = "large";
	document.getElementById("revFinal").style.fontSize = "large";
</script>

<script type="text/javascript">
	var s1 = document.getElementById("slider1");
	var s2 = document.getElementById("slider2");

	var output1 = document.getElementById("v1");
	var output2 = document.getElementById("v2");

	output1.innerHTML = s1.value;
	output2.innerHTML = s2.value;

	s1.oninput = function() {
		var sliderOneVal = this.value;
		var sliderTwoVal = document.getElementById("slider2").value;

		output1.innerHTML = sliderOneVal;
		document.getElementById("slider2").value = 100-sliderOneVal;
		output2.innerHTML = 100-sliderOneVal;

		ref.on('value',getData);

		function getData(data) {
			var db = data.val(); 
			var keys = Object.keys(db);

			var revenueData = [];
			var cdfData = [];
			for (var i=0;i<keys.length;i++) {
				var k = keys[i];
				if (db[k].x1==sliderOneVal) {
					revenueData.push({x: db[k].revenue, y: db[k].likelihood});
					cdfData.push({x: db[k].revenue, y: db[k].cdf});
				}
			}

			var revs = []; 
			var probs = [];
			var dfs = [];
			for (var i=0;i<cdfData.length;i++) {
				revs.push(cdfData[i].x);
				probs.push(cdfData[i].y);
				dfs.push(revenueData[i].y); 
			}

			for (var i=0;i<=10;i++) {
				var closest = probs.reduce(function(prev, curr) {
					return (Math.abs(curr - i/10) < Math.abs(prev - i/10) ? curr : prev);
				});
				document.getElementById("Rev"+10*i).innerHTML = "$"+Math.round(revenueData[probs.indexOf(closest)].x);
				if(i/10==1/2) {
					document.getElementById("medRev").innerHTML = "$"+Math.round(revenueData[probs.indexOf(closest)].x);
				}
			}

			var avgrev = []; 
			for (var i=0;i<cdfData.length;i++) {
				avgrev.push(revs[i]*dfs[i]*(revs[cdfData.length-1]-revs[cdfData.length-2]));
			}
			document.getElementById("avgRev").innerHTML = "$"+Math.round(avgrev.reduce((a, b) => a + b, 0));

			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					label: 'Line Dataset',
					datasets: [{
						data: revenueData,
						label: 'Revenue Data',
						backgroundColor: '#4CAF50',
						pointRadius: 0
					}], 
				},
				options: {
					title: {
						display: true,
						text: "Distribution of Revenue Potential",
          				fontSize: 20
					},
					legend: {
						display: false,
					},
					animation: {
						duration: 0
					},
					showLines: true,
					showTooltips: false, 
					tooltips: {enabled: false},
					hover: {mode: null},
					events: [], 
					scales: {
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Likelihood',
								fontSize: 16
							},
							ticks: {
								beginAtZero: true,
								fontSize: 14,
								min: 0, 
								max: 0.02,
								stepSize: 0.002
							}
						}],
						xAxes: [{
							type: 'linear',
							position: 'bottom',
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Revenue',
								fontSize: 16
							},
							gridLines: {
								display: true
							},
							ticks: {
								beginAtZero: false,
								fontSize: 14,
								min: 200,
								max: 550,
								stepSize: 50
							}
						}]
					}
				}
			});
		}
	}

	s2.oninput = function() {
		var sliderOneVal = document.getElementById("slider1").value;
		var sliderTwoVal = this.value;

		output2.innerHTML = sliderTwoVal;
		document.getElementById("slider1").value = 100-sliderTwoVal;
		output1.innerHTML = 100-sliderTwoVal;

		ref.on('value',getData);

		function getData(data) {
			var db = data.val(); 
			var keys = Object.keys(db);

			var revenueData = [];
			var cdfData = [];
			for (var i=0;i<keys.length;i++) {
				var k = keys[i];
				if (db[k].x1==sliderOneVal) {
					revenueData.push({x: db[k].revenue, y: db[k].likelihood});
					cdfData.push({x: db[k].revenue, y: db[k].cdf});
				}
			}

			var revs = []; 
			var probs = [];
			var dfs = [];
			for (var i=0;i<cdfData.length;i++) {
				revs.push(cdfData[i].x);
				probs.push(cdfData[i].y);
				dfs.push(revenueData[i].y); 
			}

			for (var i=0;i<=10;i++) {
				var closest = probs.reduce(function(prev, curr) {
					return (Math.abs(curr - i/10) < Math.abs(prev - i/10) ? curr : prev);
				});
				document.getElementById("Rev"+10*i).innerHTML = "$"+Math.round(revenueData[probs.indexOf(closest)].x);
				if(i/10==1/2) {
					document.getElementById("medRev").innerHTML = "$"+Math.round(revenueData[probs.indexOf(closest)].x);
				}
			}

			var avgrev = []; 
			for (var i=0;i<cdfData.length;i++) {
				avgrev.push(revs[i]*dfs[i]*(revs[cdfData.length-1]-revs[cdfData.length-2]));
			}
			document.getElementById("avgRev").innerHTML = "$"+Math.round(avgrev.reduce((a, b) => a + b, 0));

			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					label: 'Line Dataset',
					datasets: [{
						data: revenueData,
						label: 'Revenue Data',
						backgroundColor: '#4CAF50',
						pointRadius: 0
					}], 
				},
				options: {
					title: {
						display: true,
						text: "Distribution of Revenue Potential",
          				fontSize: 20
					},
					legend: {
						display: false,
					},
					animation: {
						duration: 0
					},
					showLines: true,
					showTooltips: false, 
					tooltips: {enabled: false},
					hover: {mode: null},
					events: [], 
					scales: {
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Likelihood',
								fontSize: 16
							},
							ticks: {
								beginAtZero: true,
								fontSize: 14,
								min: 0, 
								max: 0.02,
								stepSize: 0.002
							}
						}],
						xAxes: [{
							type: 'linear',
							position: 'bottom',
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Revenue',
								fontSize: 16
							},
							gridLines: {
								display: true
							},
							ticks: {
								beginAtZero: false,
								fontSize: 14,
								min: 200,
								max: 550,
								stepSize: 50
							}
						}]
					}
				}
			});
		}
	}

	function Random() {

		ref.on('value',getRand);

		function getRand(data) {
			var sliderOneVal = document.getElementById("slider1").value;
			var sliderTwoVal = document.getElementById("slider2").value;

			var rnd = Math.random();

			var db = data.val(); 
			var keys = Object.keys(db);

			var rev1 = [];
			var cdf1 = [];
			var dfs1 = [];
			for (var i=0;i<keys.length;i++) {
				var k = keys[i];
				if (db[k].x1==sliderOneVal) {
					rev1.push(db[k].revenue);
					cdf1.push(db[k].cdf);
					dfs1.push(db[k].likelihood);
				}
			}
			var closest = cdf1.reduce(function(prev, curr) {
				return (Math.abs(curr - rnd) < Math.abs(prev - rnd) ? curr : prev);
			});

			document.getElementById("revSim").value = "$"+Math.round(rev1[cdf1.indexOf(closest)])+" raised";

			var revenueData = [];
			for (var i=0;i<keys.length;i++) {
				var k = keys[i];
				if (db[k].x1==sliderOneVal) {
					revenueData.push({x: db[k].revenue, y: db[k].likelihood});
				}
			}

			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					label: 'Line Dataset',
					datasets: [{
						data: revenueData,
						label: 'Revenue Data',
						backgroundColor: '#4CAF50',
						pointRadius: 0
					}], 
				},
				options: {
					title: {
						display: true,
						text: "Distribution of Revenue Potential",
          				fontSize: 20
					},
					legend: {
						display: false,
					},
					animation: {
						duration: 0
					},
					showLines: true,
					showTooltips: false, 
					tooltips: {enabled: false},
					hover: {mode: null},
					events: [], 
					annotation: {
						annotations: [
						{
							type: "line",
							mode: "vertical",
							scaleID: "x-axis-0",
							value: rev1[cdf1.indexOf(closest)],
							borderColor: "black",
							label: {
								content: "$"+Math.round(rev1[cdf1.indexOf(closest)]),
								enabled: true,
								position: "top"
							}
						}
						]
					},
					scales: {
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Likelihood',
								fontSize: 16
							},
							ticks: {
								beginAtZero: true,
								fontSize: 14,
								min: 0, 
								max: 0.02,
								stepSize: 0.002
							}
						}],
						xAxes: [{
							type: 'linear',
							position: 'bottom',
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Revenue',
								fontSize: 16
							},
							gridLines: {
								display: true
							},
							ticks: {
								beginAtZero: false,
								fontSize: 14,
								min: 200,
								max: 550,
								stepSize: 50
							}
						}]
					}
				}
			});
		}
	}

	function RandomFinal() {
		r = confirm("Pressing this button will determine your payout!\nClick OK to make one final draw, or click Cancel to update your auction choices."); 
		if(r==true) {
			ref.on('value',getRand);

			function getRand(data) {
				var sliderOneVal = document.getElementById("slider1").value;
				var sliderTwoVal = document.getElementById("slider2").value;

				var rnd = Math.random();

				var db = data.val(); 
				var keys = Object.keys(db);

				var rev1 = [];
				var cdf1 = [];
				var dfs1 = [];
				for (var i=0;i<keys.length;i++) {
					var k = keys[i];
					if (db[k].x1==sliderOneVal) {
						rev1.push(db[k].revenue);
						cdf1.push(db[k].cdf);
						dfs1.push(db[k].likelihood);
					}
				}
				var closest = cdf1.reduce(function(prev, curr) {
					return (Math.abs(curr - rnd) < Math.abs(prev - rnd) ? curr : prev);
				});

				document.getElementById("revSim").value = "";
				document.getElementById("revFinal").value = "$"+Math.round(rev1[cdf1.indexOf(closest)])+" raised";

				var revenueData = [];
				for (var i=0;i<keys.length;i++) {
					var k = keys[i];
					if (db[k].x1==sliderOneVal) {
						revenueData.push({x: db[k].revenue, y: db[k].likelihood});
					}
				}

				var myChart = new Chart(ctx, {
					type: 'line',
					data: {
						label: 'Line Dataset',
						datasets: [{
							data: revenueData,
							label: 'Revenue Data',
							backgroundColor: '#4CAF50',
							pointRadius: 0
						}], 
					},
					options: {
						title: {
							display: true,
							text: "Distribution of Revenue Potential",
							fontSize: 20
						},
						legend: {
							display: false,
						},
						animation: {
							duration: 0
						},
						showLines: true,
						showTooltips: false, 
						tooltips: {enabled: false},
						hover: {mode: null},
						events: [], 
						annotation: {
							annotations: [
							{
								type: "line",
								mode: "vertical",
								scaleID: "x-axis-0",
								value: rev1[cdf1.indexOf(closest)],
								borderColor: "black",
								label: {
									content: "Your payout is $"+Math.round(rev1[cdf1.indexOf(closest)]),
									enabled: true,
									position: "top"
								}
							}
							]
						},
						scales: {
							yAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Likelihood',
									fontSize: 16
								},
								ticks: {
									beginAtZero: true,
									fontSize: 14,
									min: 0, 
									max: 0.02,
									stepSize: 0.002
								}
							}],
							xAxes: [{
								type: 'linear',
								position: 'bottom',
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Revenue',
									fontSize: 16
								},
								gridLines: {
									display: true
								},
								ticks: {
									beginAtZero: false,
									fontSize: 14,
									min: 200,
									max: 550,
									stepSize: 50
								}
							}]
						}
					}
				});
			}
		}
	}
</script>