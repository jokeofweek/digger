(function(window) {
window.Game = {
  init: function() {
    // Set up width and height.
    var canvas = document.getElementById(Game.Config.CANVAS_ID);
    // Set up the stage.
    this._stage = new createjs.Stage(canvas);
    // Set up the current screen.
    this._screen = null;
    // Reset the game state.
    this.reset();
  },
  /**
   * This resets the game state to a new fresh game.
   */
  reset: function() {
    // Remove all children.
    this._stage.removeAllChildren();

    // Switches to the start screen
    this.switchScreen(new Game.Screens.StartScreen());

    // Start the game timer if not already started
    if (!createjs.Ticker.hasEventListener("tick")) { 
      createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    }                
  },
  /**
   * This function is called every game tick.
   * @param  {?} event The tick event.
   */
  tick: function(event) {
    this._screen.tick(event, this._stage);
    this._stage.update();
  },
  /**
   * Switches the current game screen.
   * @param  {Game.Screen} newScreen The new screen.
   */
  switchScreen: function(newScreen) {
    // Leave old screen
    if (this._screen) {
      this._screen.leave();
    }
    // Remove all objects
    this._stage.removeAllChildren();
    this._screen = newScreen;
    // If we have a new screen, enter it
    if (this._screen) {
      this._screen.enter(this._stage);
    }
  }
};


})(window);