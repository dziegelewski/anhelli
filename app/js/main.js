var canvas = document.createElement('canvas');
canvas.width = VAR.W;
canvas.height = VAR.H;
var ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

Hero.born(VAR.rand(0,VAR.W));

var monsters = 2;

for (var i=1; i<monsters+1; i++) {
	var strength = VAR.rand(0,20) + 4;
	VAR.living[i] = new Man(strength*10,strength*4,Math.floor(strength/2))
	VAR.living[i].born(VAR.rand(0,VAR.W))
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
	for (var i=0,length=VAR.living.length; i<length; i++) {
		VAR.living[i].render();
	}
	drawGround()
};
animationLoop();

var init = function() {
	window.addEventListener('keydown', Hero.keyUse, false);
	window.addEventListener('keyup', Hero.keyUse, false);


	setInterval(function () {
		VAR.living[VAR.rand(1,monsters)].jump()
	},1000)

};
init()