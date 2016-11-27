var Hero = {
	lives: 3,
	isWalking: false,
	isShooting: false,
	speed: 15,
	direction: 1,
	x: 0,
	y: 0,
	walk: setInterval(function () {
		if (Hero.iswalking) {	
			Hero.x -= Hero.direction * Hero.speed;
			Hero.avatar.style.left = Hero.x + 'px';
		}
	}, 30),
	jump: function() {
		Hero.avatar.classList.add('jump');
		Hero.avatar.addEventListener("animationiteration", function () {
			Hero.avatar.classList = "";
		});
	}
};

Hero.avatar = (function placeHero(position) {
	var hero = document.createElement('div');
	hero.id = 'hero';
	hero.classList = 'hero';
	document.getElementById('start').appendChild(hero);
	return hero;
})();


document.addEventListener('keydown', function (e) {
	if (e.which === 37) {
		Hero.iswalking = true;
		Hero.direction = 1;
	} else if (e.which === 39) {
		Hero.iswalking = true;
		Hero.direction = -1;
	} else if (e.which === 32) {
		Hero.jump()
	}
});

document.addEventListener('keyup', function (e) {
	if (e.which === 37 && Hero.direction ===  1) {
		Hero.iswalking = false;
	} else if (e.which === 39 && Hero.direction === -1) {
		Hero.iswalking = false;
	}
});

