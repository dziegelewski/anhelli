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
			console.log('walk');
			Hero.x += Hero.direction * Hero.speed;
			console.log(Hero.x);
			Hero.avatar.style.right = Hero.x + 'px';
		}
	}, 60)
};

Hero.avatar = (function placeHero(position) {
	var hero = document.createElement('div');
	hero.id = 'hero';
	hero.classList = 'hero';
	document.body.appendChild(hero);
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
		Hero.isShooting = true;
	}
});

document.addEventListener('keyup', function (e) {
	if (e.which === 37 && Hero.direction ===  1) {
		Hero.iswalking = false;
	} else if (e.which === 39 && Hero.direction === -1) {
		Hero.iswalking = false;
	} else if (e.which === 32) {
		Hero.isShooting = false;
	}
});

