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

  // Create the salmon sprite sheet.
  var player = new Game.Player(Game.getLoader().getResult('truck'), 20, 20);
  stage.addChild(player);
};

Game.Screens.GameScreen = GameScreen;

})(window.Game);