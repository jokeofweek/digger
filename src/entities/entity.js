(function(Game) {

function Entity(sheet, startingAnimation) {
  // Parent constructor
  createjs.Sprite.call(this, sheet, startingAnimation);
  if (!sheet._frameWidth || !sheet._frameHeight) {
  	throw new Error('Sprite sheet is missing frame width and height.');
  }
  // Set the offset to be half the frame width and height.
  this.regX = this.regOffsetX = sheet._frameWidth / 2;
  this.regY = this.regOffsetY = sheet._frameHeight / 2;
  this.setDirection(Game.Direction.LEFT);
  this.x = this.regX;
  this.y = this.regY;
  this.setMoveDirection(null);

}
Entity.extend(createjs.Sprite);

Entity.prototype.regOffsetX = 0;
Entity.prototype.regOffsetY = 0;
Entity.prototype.moveDirection = null;
Entity.prototype.destination = null;

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

Entity.prototype.getX = function() {
	// Remove regX
	return (this.x - this.regX) / Game.Config.TILE_SIZE; 
};

Entity.prototype.getY = function() {
	// Remove regY
	return (this.y - this.regY) / Game.Config.TILE_SIZE;
};

Entity.prototype.setMoveDirection = function(moveDirection) {
  this.moveDirection = moveDirection;

  // If we aren't currently moving and requested a new move.
  if (!this.destination && this.moveDirection) {
    this._startMoving();
  }
};

Entity.prototype.getMoveDirection = function() {
  return this.moveDirection;
};

Entity.prototype._startMoving = function() {
  this.destination = getNextTile(this.getX(), this.getY(), this.getMoveDirection());
  this.setDirection(this.getMoveDirection());
  createjs.Tween.get(this).
    to({
      x: this.destination.x * Game.Config.TILE_SIZE + this.regOffsetX, 
      y: this.destination.y * Game.Config.TILE_SIZE + this.regOffsetY
    }, 300).
    call(this._completeMove.bind(this));
};

Entity.prototype._completeMove = function() {
  // We've reached out destination!
  this.destination = null;
  // If we have a move direction, move in that way!
  if (this.getMoveDirection()) {
    this._startMoving();
  }
};

/**
 * This method is called when the stage ticks.
 * @param  {?} event The tick event.
 */
Entity.prototype.tick = function(event) {
  
};

// Private helper functions
function getNextTile(startX, startY, direction) {
  if (direction == Game.Direction.LEFT) startX--;
  else if (direction == Game.Direction.RIGHT) startX++;
  else if (direction == Game.Direction.UP) startY--;
  else if (direction == Game.Direction.DOWN) startY++;
  return {x: startX, y: startY};
}

Game.Entity = Entity;
// Set up entities namespace.
Game.Entities = {};

})(window.Game);