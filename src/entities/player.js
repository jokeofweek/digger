(function(Game) {

function Player(imgPlayer, x, y) {
  this.initialize(imgPlayer, x, y);
}
Player.prototype = new createjs.Sprite();

Player.prototype.Sprite_initialize = Player.prototype.initialize; //unique to avoid overiding base class

Player.prototype.initialize = function(imgPlayer, x, y) {
  // Load the sprite sheet.
  var sheet = new createjs.SpriteSheet({
    images: [imgPlayer],
    frames: { width: 59, height: 37, regX: 0, regY: 0, count: 22},
    animations: {
      idle: [0, 21, 'idle']
    }
  });

  this.x = x;
  this.y = y;
  this.framerate = 30;
  this.Sprite_initialize(sheet, 'idle');
};

Player.prototype.tick = function(event) {
};

Game.Player = Player;

})(window.Game);