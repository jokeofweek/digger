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

  // Create the map
  this._map = new Game.Map([
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]);
  stage.addChild(this._map);

  // Create the player.
  this._player = new Game.Entities.Player(this._map);
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
  // Check if player wants to move.
  var keyDirection = Game.Keymap.getKeyDirection(event.keyCode);
  if (keyDirection) {
    this._player.setMovingDirection(keyDirection);
  }
};

/**
 * @override
 */
GameScreen.prototype.handleKeyUp = function(event) {
  // If we let go of active move key then stop moving after we reach destination.
  if (Game.Keymap.getKeyDirection(event.keyCode) == this._player.getMovingDirection()) {
    this._player.setMovingDirection(null);
  }
};

Game.Screens.GameScreen = GameScreen;

})(window.Game);