(function(Game) {

function Entity(sheet, startingAnimation) {
  // Parent constructor
  createjs.Sprite.call(this, sheet, startingAnimation);
  if (!sheet._frameWidth || !sheet._frameHeight) {
  	throw new Error('Sprite sheet is missing frame width and height.');
  }
  // Set the offset to be half the frame width and height.
  this.regX = sheet._frameWidth / 2;
  this.regY = sheet._frameHeight / 2;
  this.setDirection(Game.Direction.LEFT);
  this.setX(0);
  this.setY(0);
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

/**
 * This method is called when the stage ticks.
 * @param  {?} event The tick event.
 */
Entity.prototype.tick = function(event) {
};

Game.Entity = Entity;
// Set up entities namespace.
Game.Entities = {};

})(window.Game);