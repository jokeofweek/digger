(function(Game){

function StartScreen() {
  // Call parent constructor.
  Game.Screen.call(this);
};

/**
 * @override
 */
StartScreen.prototype.enter = function(stage) {
  console.log('Entering start screen.');

  // Render text to the screen.
  var text = new createjs.Text('Press [ENTER] to start a new game.', 'bold 24px arial', '#FFFFFF');
  text.maxWidth = Game.Config.SCREEN_WIDTH;
  text.textAlign = 'center';
  text.x = Game.Config.SCREEN_WIDTH / 2;
  text.y = Game.Config.SCREEN_HEIGHT / 2;
  stage.addChild(text);
};

/**
 * @override
 */
StartScreen.prototype.tick = function(event, stage) {
};

Game.Screens.StartScreen = StartScreen;

})(window.Game);