(function() {

function Map(tiles) {
  this.x = 0;
  this.y = 0;
  this._width = tiles[0].length;
  this._height = tiles.length;
  this._tiles = tiles;
  this._tilesheet = new createjs.SpriteSheet({
    images: [Game.getLoader().getResult('tiles')],
    frames: { width: Game.Config.TILE_SIZE, height: Game.Config.TILE_SIZE, regX: 0, regY: 0, count: 2},
    animations: {
      'tile0': {
        frames: [0],
        next: false
      },
      'tile1': {
        frames: [1],
        next: false
      }
    }
  });

  createjs.Container.call(this);

  this._setupTiles();
};
Map.extend(createjs.Container);

Map.prototype._setupTiles = function() {
  for (var x = 0; x < this._width; x++) {
    for (var y = 0; y < this._height; y++) {
      var tile = new createjs.Sprite(this._tilesheet, 'tile' + this._tiles[y][x]);
      tile.x = x * Game.Config.TILE_SIZE;
      tile.y = y * Game.Config.TILE_SIZE;

      this.addChild(tile);
    }
  }
};

/**
 * This function checks if a given tile can be walked on.
 * @param  {int}  x The x position to test.
 * @param  {int}  y The y position to test.
 * @return {Boolean}   true if the tile is within bounds and walkable,
 *                          else false.
 */
Map.prototype.isWalkable = function(x, y) {
  // Make sure the position is within bounds.
  if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
    return false;
  }
  return this._tiles[y][x] == 0;
};

Game.Map = Map;

})(window.Game);