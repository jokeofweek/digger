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


Game.Screens.GameScreen = GameScreen;

})(window.Game);