(function(Game) {

function Player() {
  var frameWidth = 62;
  var frameHeight = 38;
  var sheet = new createjs.SpriteSheet({
    images: [Game.getLoader().getResult('truck')],
    frames: { width: frameWidth, height: frameHeight, regX: 0, regY: 0, count: 4},
    animations: {
      idle: {
        frames: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3],
      }
    }
  });

  Game.Entity.call(this, sheet, 'idle');
};
Player.extend(Game.Entity);

Game.Entities.Player = Player;

})(window.Game);