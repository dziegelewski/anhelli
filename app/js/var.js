var VAR = {
	fps: 60,
	W: 900,
	H: 600,
	rand: function(min,max) {
		return Math.floor(Math.random() * max) + min;
	},
	randRGB: function(darkest=0,brightest=255) {
		return 'rgb(' + VAR.rand(darkest,brightest) + ',' + VAR.rand(darkest,brightest) + ',' + VAR.rand(darkest,brightest) + ')';
	},
	groundThickness: 50,
	groundColor: 'black',
	living: [],
};