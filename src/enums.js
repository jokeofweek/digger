(function(Game) {
  
Game.Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4
};

Game.Keymap = {
  RETURN: {name: 'Return', value: 13},
  LEFT: [{name: 'Left', value: 37},
	   {name: 'A', value: 65}]
}

})(window.Game);