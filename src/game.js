(function(window) {
window.Game = {
  init: function() {
    // Set up width and height.
    var canvas = document.getElementById(Game.Config.CANVAS_ID);
    // Set up the stage.
    this._stage = new createjs.Stage(canvas);
    // Reset the game state.
    this.reset();
  },
  reset: function() {
    // Remove all children.
    this._stage.removeAllChildren();

    // Add a circle
    this._circle = new createjs.Shape();
    this._circle.graphics.beginFill('red').drawCircle(0, 0, 50);
    this._circle.x = 100;
    this._circle.y = 100;
    this._stage.addChild(this._circle);

    // Start the game timer if not already started
    if (!createjs.Ticker.hasEventListener("tick")) { 
      createjs.Ticker.addEventListener("tick", this.tick.bind(this));
    }                
  },
  tick: function(event) {
    this._circle.x += event.delta / 1000 * 100;
    this._stage.update();
  }
};


})(window);