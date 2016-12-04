var Man = function(height,width,speed,color = VAR.randRGB(0,90),direction = 1) {
	this.height = height;
	this.width = width;
	this.speed = speed;
	this.color = color;
	this.direction = direction;
	this.that = this;
	this.born = function(x,y = VAR.H - VAR.groundThickness) {
		living.push(this);
		this.x = x;
		this.y = y-this.height;
	};
	this.render = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	};
	this.move = function() {
		if ((this.x >= VAR.W - this.width - this.speed/2 && this.direction === 1) || (this.x <= this.speed/2 && this.direction === -1)) {
			this.direction *= -1;
		}
		this.x += this.speed * this.direction;
	};
};