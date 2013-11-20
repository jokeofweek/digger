(function(window) {

var loader = null;

window.Game = {
  init: function() {
    // Set up width and height.
    var canvas = document.getElementById(Game.Config.CANVAS_ID);
    // Set up the stage.
    this._stage = new createjs.Stage(canvas);
    // Set up the current screen.
    this._screen = null;
    // Set up the window event listeners
    document.onkeydown = this.handleKeyDown.bind(this);
    document.onkeyup = this.handleKeyUp.bind(this);

    // Load the assets before starting the game.
    manifest = [
      {src: 'assets/salmon.png', id: 'salmon'},
      {src: 'assets/truck.png', id: 'truck'},
      {src: 'assets/truck_small.png', id: 'truck_small'},
      {src: 'assets/tiles.png', id: 'tiles'}
    ];
    loader = new createjs.LoadQueue(false);
    loader.addEventListener('complete', this.reset.bind(this));
    loader.loadManifest(manifest);
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
      createjs.Ticker.setFPS(64);
      createjs.Ticker.useRAF = true;
    }                
  },
  getLoader: function() {
    return loader;
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
   * This function is called every time a key is pressed. The event
   * is then proxied to the screen.
   * @param  {?} event The keydown event.
   */
  handleKeyDown: function(event) {
    // For cross-browser support
    if (!event) {
      event = window.event
    }
    if (this._screen) {
     this._screen.handleKeyDown(event);
    }
  },
  /**
   * This function is called every time a key is released. The event
   * is then proxied to the screen.
   * @param  {?} event The keyup event.
   */
  handleKeyUp: function(event) {
    // For cross-browser support
    if (!event) {
      event = window.event
    }
    if (this._screen) {
      this._screen.handleKeyUp(event);
    }
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