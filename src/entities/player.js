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
    frames: { width: 62, height: 38, regX: 0, regY: 0, count: 4},
    animations: {
      idle: {
        frames: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
      }
    }
  });

  this.x = x;
  this.y = y;
  this.Sprite_initialize(sheet, 'idle');
};

Player.prototype.tick = function(event) {
};

Game.Player = Player;

})(window.Game);