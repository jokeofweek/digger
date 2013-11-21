(function(Game) {

function Entity(map, sheet, startingAnimation) {
  // Parent constructor
  createjs.Sprite.call(this, sheet, startingAnimation);
  if (!sheet._frameWidth || !sheet._frameHeight) {
  	throw new Error('Sprite sheet is missing frame width and height.');
  }
  // Set the offset to be half the frame width and height.
  this.regX = this._regOffsetX = sheet._frameWidth / 2;
  this.regY = this._regOffsetY = sheet._frameHeight / 2;
  this.x = this.regX;
  this.y = this.regY;
  this._map = map;
  this.setFacingDirection(Game.Direction.LEFT);
  this.setMovingDirection(null);

}
Entity.extend(createjs.Sprite);

Entity.prototype._regOffsetX = 0;
Entity.prototype._regOffsetY = 0;
Entity.prototype._movingDirection = null;
Entity.prototype._destination = null;

/**
 * Updates the direction the entity is facing.
 * @param {Game.Direction} direction The new direction to face.
 */
Entity.prototype.setFacingDirection = function(direction) {
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

/**
 * @return {int} the X tile position on the map.
 */
Entity.prototype.getX = function() {
	// Remove regX
	return Math.round((this.x - this.regX) / Game.Config.TILE_SIZE); 
};

/*
 * @return {int} the Y tile position on the map.
 */
Entity.prototype.getY = function() {
	// Remove regY
	return Math.round((this.y - this.regY) / Game.Config.TILE_SIZE);
};

/**
 * This updates the direction that the entity wishes to move in.
 * @param {Game.Direction?} moveDirection The direction to move in, or null if 
 *                                        no move is desired.
 */
Entity.prototype.setMovingDirection = function(moveDirection) {
  this._movingDirection = moveDirection;

  // If we aren't currently moving and requested a new move.
  if (!this._destination && this._movingDirection) {
    this._startMoving();
  }
};

Entity.prototype.getMovingDirection = function() {
  return this._movingDirection;
};

/**
 * Helper method which attempts to start a move.
 */
Entity.prototype._startMoving = function() {
  var destination = getNextTile(this.getX(), this.getY(), this.getMovingDirection());
  this.setFacingDirection(this.getMovingDirection());
  // If the tile is mineable, try to mine it.
  if (this._map.isMineable(destination.x, destination.y)) {
    this._map.updateTile(destination.x, destination.y, 0);
  // Only move if we actually can.
  } else  if (this._map.isWalkable(destination.x, destination.y)) {
    this._destination = destination;
    createjs.Tween.get(this).
      to({
        x: this._destination.x * Game.Config.TILE_SIZE + this._regOffsetX, 
        y: this._destination.y * Game.Config.TILE_SIZE + this._regOffsetY
      }, 300).
      call(this._completeMove.bind(this));
  }
};

/**
 * Helper method which is called once a move is complete.
 */
Entity.prototype._completeMove = function() {
  // We've reached out destination!
  this._destination = null;
  // If we have a move direction, move in that way!
  if (this.getMovingDirection()) {
    this._startMoving();
  }
};

/**
 * Interface method which other entities can override to specify an action
 * to perform on game ticks.
 * @param  {event} event The tick event.
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