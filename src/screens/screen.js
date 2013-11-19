(function(Game) {

/**
 * This interface represents a basic games screen.
 */
function Screen() {
};

/**
 * This method is called when the stage ticks.
 * @param  {?} event The tick event.
 * @param  {createjs.Stage} stage The game stage.
 */
Screen.prototype.tick = function(event, stage) {
};

/**
 * This method is called when the player enters a screen.
 * @param  {createjs.Stage} stage The game stage.
 */
Screen.prototype.enter = function(stage) {
};

/**
 * This method is called when the player leaves a screen.
 */
Screen.prototype.leave = function() {
};

/**
 * This method is called when the player presses a key.
 * @param  {?} event The keydown event.
 */
Screen.prototype.handleKeyDown = function(event) {
};

/**
 * This method is called when the player releases a key.
 * @param  {?} event The keyup event.
 */
Screen.prototype.handleKeyUp = function(event) {
};

Game.Screen = Screen;
// Screens namespace
Game.Screens = {};

})(window.Game);