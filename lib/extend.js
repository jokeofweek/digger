// This shim is extracted from rot.js
// (http://ondras.github.io/rot.js/hp/)
if (!Object.create) {  
  /**
   * ES5 Object.create
   */
  Object.create = function(o) {  
    var tmp = function() {};
    tmp.prototype = o;
    return new tmp();
  };  
}  
/**
 * Sets prototype of this function to an instance of parent function
 * @param {function} parent
 */
Function.prototype.extend = function(parent) {
  this.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
  return this;
}