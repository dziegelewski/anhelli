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
	groundColor: 'black'
};

var living = [];


var canvas = document.createElement('canvas');
canvas.width = VAR.W;
canvas.height = VAR.H;
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);


var Hero = new Man(60,20,13,'lightseagreen')
Hero.keyUse = function(e) {
	if (e.which === 37 || e.which === 39) {
		e.preventDefault();
		Hero['key_' + e.which] = e.type === 'keydown' ? true : false;
	}
};
Hero.move = function() {
	if (this.key_37 === true) {
		if (this.x <= this.speed/2) {
			return false;
		}
		this.x -= this.speed;
	}
	if (this.key_39 === true) {
		if (this.x >= VAR.W - this.width - this.speed/2) {
			return false;
		}
		this.x += this.speed;
	}
}

Hero.born(VAR.rand(0,VAR.W));

var monsters = 3,
	mns = [];

for (var i=0; i<monsters; i++) {
	var strength = VAR.rand(0,6) + 9;
	mns[i] = new Man(strength*10,strength*4,Math.floor(strength/2))
	mns[i].born(VAR.rand(0,VAR.W))
}


var drawGround = function() {
	var horizontal = VAR.H - VAR.groundThickness
	ctx.beginPath();
	ctx.moveTo(0,horizontal);
	ctx.lineTo(VAR.W,horizontal);
	ctx.strokeStyle = VAR.groundColor;
	ctx.lineWidth = 3;
	ctx.stroke();

};

var animationLoop = function() {
	ctx.clearRect(0,0,VAR.W,VAR.H);
	requestAnimationFrame(animationLoop);
	for (var i=0,length=living.length; i<length; i++) {
		living[i].move();
		living[i].render();
	}
	drawGround()
};
animationLoop();

var init = function() {
	window.addEventListener('keydown', Hero.keyUse, false);
	window.addEventListener('keyup', Hero.keyUse, false);
};
init()