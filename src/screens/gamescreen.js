(function(Game){

function GameScreen() {
  // Call parent constructor.
  Game.Screen.call(this);
};
GameScreen.extend(Game.Screen);

/**
 * @override
 */
GameScreen.prototype.enter = function(stage) {
  console.log('Entering game screen.');

  // Create the player.
  this._player = new Game.Entities.Player();
  stage.addChild(this._player);
};

/**
 * @override
 */
GameScreen.prototype.tick = function(event, stage) {
  this._player.tick(event);
};

/**
 * @override
 */
GameScreen.prototype.handleKeyDown = function(event) {
  // Check if player started moving or is moving in a different direction.
  if (!this._player.isMoving() || !Game.Keymap.isKey(event.keyCode, Game.Direction.getDirectionKey(this._player.getDirection()))) {
    if (Game.Keymap.isKey(event.keyCode, Game.Keymap.LEFT)) {
      this._player.setDirection(Game.Direction.LEFT);
      this._player.setMoving(true);
    } else if (Game.Keymap.isKey(event.keyCode, Game.Keymap.RIGHT)) {
      this._player.setDirection(Game.Direction.RIGHT);
      this._player.setMoving(true);
    }  else if (Game.Keymap.isKey(event.keyCode, Game.Keymap.UP)) {
      this._player.setDirection(Game.Direction.UP);
      this._player.setMoving(true);
    }  else if (Game.Keymap.isKey(event.keyCode, Game.Keymap.DOWN)) {
      this._player.setDirection(Game.Direction.DOWN);
      this._player.setMoving(true);
    } 
  }
};

/**
 * @override
 */
GameScreen.prototype.handleKeyUp = function(event) {
  // If we let go of the key for the player's direction, quit moving
  if (Game.Keymap.isKey(event.keyCode, Game.Direction.getDirectionKey(this._player.getDirection()))) {
    this._player.setMoving(false);
  }
};

Game.Screens.GameScreen = GameScreen;

})(window.Game);