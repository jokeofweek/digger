(function(Game){

function GameScreen() {
  // Call parent constructor.
  Game.Screen.call(this);
};
GameScreen.prototype = new Game.Screen();

/**
 * @override
 */
GameScreen.prototype.enter = function(stage) {
  console.log('Entering game screen.');
};

Game.Screens.GameScreen = GameScreen;

})(window.Game);