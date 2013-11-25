(function(Game) {

function Player(map) {
  var frameWidth = 32;
  var frameHeight = 32;
  var sheet = new createjs.SpriteSheet({
    images: [Game.getLoader().getResult('truck_small')],
    frames: { width: frameWidth, height: frameHeight, regX: 0, regY: 0, count: 4},
    animations: {
      idle: {
        frames: [0]
      },
      moving: {
        frames: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]
      }
    }
  });

  Game.Entity.call(this, map, sheet, 'idle');
};
Player.extend(Game.Entity);

/**
 * @override
 */
Player.prototype.enterTile = function(x, y) {
  // If the tile is mineable, try to mine it.
  if (this._map.isMineable(x, y)) {
    this._map.updateTile(x, y, 0);
    // Call super method
  } else {
    Game.Entity.prototype.enterTile.call(this, x, y);
  }
};

Game.Entities.Player = Player;

})(window.Game);