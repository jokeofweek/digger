(function() {

function Map(width, height) {
  this.x = 0;
  this.y = 0;
  this._width = width;
  this._height = height;
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
      var tileType = (x + (y * this._width)) % 2 ? 'tile1' : 'tile0';
      var tile = new createjs.Sprite(this._tilesheet, tileType);
      tile.x = x * Game.Config.TILE_SIZE;
      tile.y = y * Game.Config.TILE_SIZE;

      this.addChild(tile);
    }
  }
};

Game.Map = Map;

})(window.Game);