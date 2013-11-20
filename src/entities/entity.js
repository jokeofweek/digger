(function(Game) {

function Entity(sheet, startingAnimation) {
  // Parent constructor
  createjs.Sprite.call(this, sheet, startingAnimation);
  if (!sheet._frameWidth || !sheet._frameHeight) {
  	throw new Error('Sprite sheet is missing frame width and height.');
  }
  // Set the offset to be half the frame width and height.
  this.regX = this.originalRegX = sheet._frameWidth / 2;
  this.regY = this.originalRegY = sheet._frameHeight / 2;
  this.setDirection(Game.Direction.LEFT);
  this.setX(0);
  this.setY(0);
  this.setMoving(false);
}
Entity.extend(createjs.Sprite);

/**
 * Updates the direction of the entity.
 * @param {Game.Direction} direction The new direction.
 */
Entity.prototype.setDirection = function(direction) {
  this._direction = direction;
  // Set the scales.
  switch (direction) {
    case Game.Direction.LEFT:
      this.rotation = 0;
      break;
    case Game.Direction.UP:
      this.rotation = 90;
      break;
    case Game.Direction.RIGHT:
      this.rotation = 180;
      break;
    case Game.Direction.DOWN:
      this.rotation = 270;
      break;
  }
};

Entity.prototype.getDirection = function() {
  return this._direction;
};

Entity.prototype.setX = function(x) {
	// Update the x to take regX into consideration.
	this.x = x + this.regX;
};

Entity.prototype.getX = function() {
	// Remove regX
	return this.x - this.regX;
};

Entity.prototype.setY = function(y) {
	// Update the y to take regY into consideration.
	this.y = y + this.regY;
};

Entity.prototype.getY = function() {
	// Remove regY
	return this.y - this.regY;
};

Entity.prototype.setMoving = function(moving) {
  this._moving = moving;
  this.gotoAndPlay(this._moving ? 'moving' : 'idle');
};

Entity.prototype.isMoving = function() {
  return this._moving;
};

/**
 * This method is called when the stage ticks.
 * @param  {?} event The tick event.
 */
Entity.prototype.tick = function(event) {
  if (this._moving) {
    var movement = Math.round(event.delta/1000 * 128);
    switch (this._direction) {
      case Game.Direction.UP:
        this.setY(this.getY() - movement); break;
      case Game.Direction.DOWN:
        this.setY(this.getY() + movement); break;
      case Game.Direction.LEFT:
        this.setX(this.getX() - movement); break;
      case Game.Direction.RIGHT:
        this.setX(this.getX() + movement); break;
    }
  }
};

Game.Entity = Entity;
// Set up entities namespace.
Game.Entities = {};

})(window.Game);