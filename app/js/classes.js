var Man = function(height=60,width=20,speed=5,color = VAR.randRGB(0,90),direction = 1) {
	this.height = height;
	this.width = width;
	this.speed = speed;
	this.color = color;
	this.direction = direction;
	this.isMoving = true;
	// 
	this.born = function(x,y = VAR.H - VAR.groundThickness) {
		VAR.living.push(this);
		this.x = x;
		this.y = y-this.height;
	};
	// 
	this.render = function() {
		if (this.isMoving) {
			this.move();
		}
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,(this.y-this.overGround),this.width,this.height);
	};
	// 
	this.move = function() {
		if ((this.x >= VAR.W - this.width - this.speed/2 && this.direction === 1) || (this.x <= this.speed/2 && this.direction === -1)) {
			this.direction *= -1;
		}
		this.x += this.speed * this.direction;
		this.moveY()
	};
	this.moveY = function () {
		if (this.isJumping === true) {
			var distanceUp = (this.jumpHeight - this.overGround)/12 + 1;
			this.overGround += distanceUp;
			if (this.overGround >= this.jumpHeight) {
				this.isJumping = false;
			}
		} else if (this.overGround !== 0) {
			if (this.overGround > 0) {
				if (this.falling < 20) {
					this.falling = (this.falling+0.4*2);
				}
				this.overGround -= this.falling;
			} else {
				this.overGround = 0;
				this.falling = 0;
			}
		}
	}

	//

	this.overGround = 0;
	this.jumpHeight = VAR.rand(50,200);
	this.falling = 0;

	this.jump = function() {
		if (!this.isJumping && this.overGround <= 0) {
			this.isJumping = true;
		}
	}
};



var Hero = new Man(60,20,13,'lightseagreen');;
Hero.jumpHeight = 30;
Hero.keyUse = function(e) {
	if (e.which === 37 || e.which === 39 || e.which === 32) {
		e.preventDefault();
		Hero['key_' + e.which] = e.type === 'keydown' ? true : false;
		if (e.which === 32) {
			Hero.jump();
		}
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
	Hero.moveY();
}
