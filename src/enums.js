(function(Game) {
  
Game.Direction = Object.freeze({
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
  getDirectionKey: function(direction) {
    switch (direction) {
      case Game.Direction.UP: return Game.Keymap.UP;
      case Game.Direction.LEFT: return Game.Keymap.LEFT;
      case Game.Direction.RIGHT: return Game.Keymap.RIGHT;
      case Game.Direction.DOWN: return Game.Keymap.DOWN;
    }
  }
});

/**
 * This enum represents the key mappings to be used in game. It allows
 * the bindings to be dynamically modified as well as associating more
 * than one key with a given action (eg. arrow keys and WASD for movement).
 */
Game.Keymap = {
  RETURN: {name: 'Return', value: 13},
  LEFT: [{name: 'Left', value: 37},
     {name: 'A', value: 65}],
  RIGHT: [{name: 'Right', value: 39},
     {name: 'D', value: 68}],
  UP: [{name: 'Up', value: 38},
     {name: 'W', value: 87}],
  DOWN: [{name: 'Down', value: 40},
     {name: 'S', value: 83}],
  /**
   * Checks whether a given key is pressed.
   * @param {int} keyCode The keycode that was pressed.
   * @param {Game.Keymap} keyTest The key to check.
   */
  isKey: function(keyCode, keyTest) {
    // If there are multiple keys, need to iterate through.
    if (keyTest.length) {
      for (var i = keyTest.length - 1; i >= 0; i--) {
        if (keyTest[i].value == keyCode) {
          return true;
        }
      };
      return false;
    } else {
      // simply check the value
      return keyTest.value == keyCode;
    }
  },
  /**
   * Thus determines the direction for a given key, or null if it is not
   * a directional key.
   * @param  {int} keyCode The key that was pressed. 
   * @return {?Game.Direction} If the key is directional, returns the direction
   *                              of the key else null.
   */
  getKeyDirection: function(keyCode) {
    if (this.isKey(keyCode, this.LEFT)) return Game.Direction.LEFT;
    if (this.isKey(keyCode, this.RIGHT)) return Game.Direction.RIGHT;
    if (this.isKey(keyCode, this.UP)) return Game.Direction.UP;
    if (this.isKey(keyCode, this.DOWN)) return Game.Direction.DOWN;
    return false;
  }
}

})(window.Game);