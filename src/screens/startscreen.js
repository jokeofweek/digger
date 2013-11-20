(function(Game){

function StartScreen() {
  // Call parent constructor.
  Game.Screen.call(this);
};
StartScreen.extend(Game.Screen);

/**
 * @override
 */
StartScreen.prototype.enter = function(stage) {
  console.log('Entering start screen.');

  // Render text to the screen.
  var text = new createjs.Text(String.format('Press [%key] to start a new game.', Game.Config.KEYMAP.RETURN), 
      'bold 24px arial', '#FFFFFF');
  text.maxWidth = Game.Config.SCREEN_WIDTH;
  text.textAlign = 'center';
  text.x = Game.Config.SCREEN_WIDTH / 2;
  text.y = Game.Config.SCREEN_HEIGHT / 2;
  stage.addChild(text);
};

/**
 * @override
 */
StartScreen.prototype.handleKeyDown = function(event) {
  if (event.keyCode == Game.Config.KEYMAP.RETURN.value) {
    Game.switchScreen(new Game.Screens.GameScreen());
  }
};
Game.Screens.StartScreen = StartScreen;

})(window.Game);