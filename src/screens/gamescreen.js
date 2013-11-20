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

Game.Screens.GameScreen = GameScreen;

})(window.Game);