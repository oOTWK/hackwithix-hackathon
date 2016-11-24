$(document).ready(function(){
    $('#ok').on('click', function(){

		var query = $("input[name=radio]:checked")[0].id;
		var fun_arr = [getLineChart, getCatChart, getBarChart, getPieChart];
		var func = fun_arr[$('#chartType').val()];
		var charNum = $('#chartNum').val();

		switch(query) {
			case "radio1":
				var text = $('#tex1').val();
				$.ajax({
					method: 'get',
					url: 'http://localhost:8000/impressions?dc=' + text,
					success: function(json) {
						var x = ['desktop', 'mobile', 'app'];
						var y = [0,0,0];

						$.each(json.data, function(i, item) {
							if (item.platform == 'desktop') {
								y[0]++;
							} else if (item.platform == 'mobile') {
								y[1]++;
							} else {
								y[2]++;
							}
						});

						func({x:x, y:y}, charNum, text, "datacenter", "platform");
					},

					error: function() {
						console.log("ajax fails");
					}
				});
				$('#tex1').val('');
				break;
			case "radio2":
				var text = $('#tex2').val();
				$.ajax({
					method: 'get',
					url: 'http://localhost:8000/impressions?dc=' + text,
					success: function(json) {
						var x = ['banner', 'video'];
						var y = [0,0];

						$.each(json.data, function(i, item) {
							if (item.format == 'banner') {
								y[0]++;
							} else {
								y[1]++;
							}
						});

						func({x:x, y:y}, charNum, text, "datacenter", "formats");
					},

					error: function() {
						console.log("ajax fails");
					}
				});
				$('#tex2').val('');
				break;
			case "radio3":
				$.ajax({
					method: 'get',
					url: 'http://localhost:8000/servers',
					success: function(json) {
						var x = [];
						var y = [];

						$.each(json.data, function(i, item) {
							x.push(item.id);
							y.push(item.online);
						});

						func({x:x, y:y}, charNum, "", "server id", "first online time");
					},

					error: function() {
						console.log("ajax fails");
					}
				});
				break;
			case "radio4":
				var text = $('#tex4').val();
				$.ajax({
					method: 'get',
					url: 'http://localhost:8000/performance?dc='+text.substring(0,2)+'&id='+text,
					success: function(json) {
						var x = [];
						var y = [];
						var day = -1;
						var count = 0;
						var div;
						var firstloop=true;

						$.each(json.data, function(i, item) {
							var date = new Date(item.timestamp);

							if (day != date.getDate()) {
								console.log(date)
								day = date.getDate();
								if (!firstloop) {
									y[y.length-1] = y[y.length-1]/count;

								}
								x.push((date.getMonth()+1)+"/"+date.getDate());
								y.push(item.lag);

								firstloop=false;
								count = 1;
								div=false;
							} else {
								y[y.length-1] += item.lag;
								count++;
								div=true;
							}

						});
						if (div) {
							y[y.length-1] = y[y.length-1]/count;
						}

						func({x:x, y:y}, charNum, "Daily lag on "+text, "date", "lag in ms");
					},

					error: function() {
						console.log("ajax fails");
					}
				});
				$('#tex4').val('');
				break;

			case "radio5":
				var text = $('#tex5').val();
				$.ajax({
					method: 'get',
					url: 'http://localhost:8000/performance?dc='+text.substring(0,2)+'&id='+text,
					success: function(json) {
						var x = [];
						var y = [];
						var day = -1;
						var count = 0;
						var div;
						var firstloop=true;

						$.each(json.data, function(i, item) {
							var date = new Date(item.timestamp);

							if (day != date.getDate()) {
								console.log(date)
								day = date.getDate();
								if (!firstloop) {
									y[y.length-1] = y[y.length-1]/count;

								}
								x.push((date.getMonth()+1)+"/"+date.getDate());
								y.push(item.mean);

								firstloop=false;
								count = 1;
								div=false;
							} else {
								y[y.length-1] += item.mean;
								count++;
								div=true;
							}

						});
						if (div) {
							y[y.length-1] = y[y.length-1]/count;
						}

						func({x:x, y:y}, charNum, "Daily avg response time on "+text, "date", "avg response time for all reqests");
					},

					error: function() {
						console.log("ajax fails");
					}
				});
				$('#tex5').val('');
				break;

			case "radio6":
				var text = $('#tex6').val();
				$.ajax({
					method: 'get',
					url: 'http://localhost:8000/performance?dc='+text.substring(0,2)+'&id='+text,
					success: function(json) {
						var x = [];
						var y = [];
						var day = -1;
						var count = 0;
						var div;
						var firstloop=true;

						$.each(json.data, function(i, item) {
							var date = new Date(item.timestamp);

							if (day != date.getDate()) {
								console.log(date)
								day = date.getDate();
								x.push((date.getMonth()+1)+"/"+date.getDate());
								y.push(item.requests);
							} else {
								y[y.length-1] += item.requests;
							}
						});

						func({x:x, y:y}, charNum, "Daily requests on "+text, "date", "requests");
					},

					error: function() {
						console.log("ajax fails");
					}
				});
				$('#tex6').val('');
				break;

			case "radio7":
				var text = $('#tex7').val();
				$.ajax({
					method: 'get',
					url: 'http://localhost:8000/impressions?dc=' + text,
					success: function(json) {
						var x = [];
						var y = [];
						var day = -1;
						var count = 0;
						var div;
						var firstloop=true;

						$.each(json.data, function(i, item) {
							var date = new Date(item.timestamp);

							if (day != date.getDate()) {
								console.log(date)
								day = date.getDate();
								x.push((date.getMonth()+1)+"/"+date.getDate());
								y.push(item.impressions);
							} else {
								y[y.length-1] += item.impressions;
							}
						});

						func({x:x, y:y}, charNum, "Daily impressions on "+text, "date", "impressions");
					},

					error: function() {
						console.log("ajax fails");
					}
				});
				$('#tex7').val('');
				break;
		}
    });


    function getBarChart(json, canvas_id, label, xlabel, ylabel) {
    	removeAndAddCanvas(canvas_id);
        var canvas = document.getElementById('chart'+canvas_id);
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var bgcolor = [];
        var data = {
            labels: json.x,
            datasets: [
                {
                    label: label,
                    xaxisid: xlabel,
                    backgroundColor: bgcolor,
                    data: json.y,
                }
            ],
        };

        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: false,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: xlabel
                        }
                    },],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: ylabel
                        }
                    },],
                }
            },
        });

        for (var i = 0; i < myBarChart.data.datasets[0].data.length; i++) {
            bgcolor.push("#"+((1<<24)*Math.random()|0).toString(16));
        }

        myBarChart.update();
    }



    function getPieChart(json, canvas_id, label, xlabel, ylabel) {
    	removeAndAddCanvas(canvas_id);
        var ctx = document.getElementById('chart'+canvas_id);
        var bgcolor = [];
        var data = {
            labels: json.x,
            datasets: [
                {
                    label: label,
                    backgroundColor: bgcolor,
                    data: json.y,
                }
            ]
        };

        var myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: false,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: xlabel
                        }
                    },],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: ylabel
                        }
                    },],
                }
            },
        });

        for (var i = 0; i < myPieChart.data.datasets[0].data.length; i++) {
            bgcolor.push("#"+((1<<24)*Math.random()|0).toString(16));
        }
        
        myPieChart.update();
    }



    function getLineChart(json, canvas_id, label, xlabel, ylabel) {
    	removeAndAddCanvas(canvas_id);
        var ctx = document.getElementById('chart'+canvas_id);
        var bgcolor = [];
        var data = {
            labels: json.x,
            datasets: [
                {
                    label: label,
                    data: json.y,
                    borderColor: "#"+((1<<24)*Math.random()|0).toString(16), 
                }
            ]
        };

        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: xlabel
                        }
                    },],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: ylabel
                        }
                    },],
                }
            },
        });

    }


    function getCatChart(json, canvas_id, label, xlabel, ylabel) {
    	removeAndAddCanvas(canvas_id);
        var ctx = document.getElementById('chart'+canvas_id);
        var pointColor = "#"+((1<<24)*Math.random()|0).toString(16);
        var data = {
            labels: json.x,
            datasets: [
                {
                    label: label,
                    data: json.y,
                    borderColor: pointColor,
                    pointBackgroundColor: pointColor,
                }
            ]
        };

        var myCatChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false,
                showLines: false,
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: xlabel
                        }
                    },],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: ylabel
                        }
                    },],
                }
            },
        });
    }

    function removeAndAddCanvas(id) {
    	var width = $('#chart'+id).attr('width');
    	var height = $('#chart'+id).attr('height');
    	$('#chart'+id).remove();
    	addCanvas(id, width, height);
    }

    function addCanvas(id, width, height) {
    	$('#cont'+id)
    	.append('<canvas id="chart'+id+'" width="'+width+'" height="'+height+'" ></canvas>');
    }

    function removeAllCanvas() {
    	$('#chart1').remove();
    	$('#chart2').remove();
    	$('#chart3').remove();
    	$('#chart4').remove();
    	$('#chart5').remove();
    	$('#chart6').remove();
    	$('#chart7').remove();
    	$('#chart8').remove();
    }

	$('#view2').on('click', function(){
		removeAllCanvas();
		addCanvas(1, 600, 550);
		addCanvas(2, 600, 550);

		$('#cont1').attr('class', 'chart panel panel-primary');
		$('#cont2').attr('class', 'chart panel panel-primary');
		$('#cont3').attr('class', 'hidden');
		$('#cont4').attr('class', 'hidden');
		$('#cont5').attr('class', 'hidden');
		$('#cont6').attr('class', 'hidden');
		$('#cont7').attr('class', 'hidden');
		$('#cont8').attr('class', 'hidden');

		$('#cont2').parent().attr('class', '').attr('style', 'display: inline-block;');;

		$('#chartNum option[value="1"]').attr('class', '');
		$('#chartNum option[value="2"]').attr('class', '');
		$('#chartNum option[value="3"]').attr('class', 'hidden');
		$('#chartNum option[value="4"]').attr('class', 'hidden');
		$('#chartNum option[value="5"]').attr('class', 'hidden');
		$('#chartNum option[value="6"]').attr('class', 'hidden');
		$('#chartNum option[value="7"]').attr('class', 'hidden');
		$('#chartNum option[value="8"]').attr('class', 'hidden');

	});    

	$('#view4').on('click', function(){
		removeAllCanvas();
		addCanvas(1, 600, 550);
		addCanvas(2, 290, 250);
		addCanvas(3, 290, 250);
		addCanvas(4, 600, 250);

		$('#cont1').attr('class', 'top-chart panel panel-primary');
		$('#cont2').attr('class', 'top-chart panel panel-primary');
		$('#cont3').attr('class', 'top-chart panel panel-primary');
		$('#cont4').attr('class', 'hori-chart panel panel-primary');
		$('#cont5').attr('class', 'hidden');
		$('#cont6').attr('class', 'hidden');
		$('#cont7').attr('class', 'hidden');
		$('#cont8').attr('class', 'hidden');

		$('#cont2').parent().attr('class', 'view4-cont').attr('style', 'display: inline-block;');

		$('#chartNum option[value="1"]').attr('class', '');
		$('#chartNum option[value="2"]').attr('class', '');
		$('#chartNum option[value="3"]').attr('class', '');
		$('#chartNum option[value="4"]').attr('class', '');
		$('#chartNum option[value="5"]').attr('class', 'hidden');
		$('#chartNum option[value="6"]').attr('class', 'hidden');
		$('#chartNum option[value="7"]').attr('class', 'hidden');
		$('#chartNum option[value="8"]').attr('class', 'hidden');
	});

	$('#view8').on('click', function(){
		removeAllCanvas();
		addCanvas(1, 290, 250);
		addCanvas(2, 290, 250);
		addCanvas(3, 290, 250);
		addCanvas(4, 290, 250);
		addCanvas(5, 290, 250);
		addCanvas(6, 290, 250);
		addCanvas(7, 290, 250);
		addCanvas(8, 290, 250);

		$('#cont1').attr('class', 'chart panel panel-primary');
		$('#cont2').attr('class', 'chart panel panel-primary');
		$('#cont3').attr('class', 'chart panel panel-primary');
		$('#cont4').attr('class', 'chart panel panel-primary');
		$('#cont5').attr('class', 'chart panel panel-primary');
		$('#cont6').attr('class', 'chart panel panel-primary');
		$('#cont7').attr('class', 'chart panel panel-primary');
		$('#cont8').attr('class', 'chart panel panel-primary');

		$('#cont2').parent().attr('class', '').attr('style', 'display: inline;');

		$('#chartNum option[value="1"]').attr('class', '');
		$('#chartNum option[value="2"]').attr('class', '');
		$('#chartNum option[value="3"]').attr('class', '');
		$('#chartNum option[value="4"]').attr('class', '');
		$('#chartNum option[value="5"]').attr('class', '');
		$('#chartNum option[value="6"]').attr('class', '');
		$('#chartNum option[value="7"]').attr('class', '');
		$('#chartNum option[value="8"]').attr('class', '');
	});
})