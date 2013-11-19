/**
 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
 * @param {string} template
 * @param {any} [argv]
 */
String.format = function(template) {
  var map = String.format.map;
  var args = Array.prototype.slice.call(arguments, 1);

  var replacer = function(match, group1, group2, index) {
    if (template.charAt(index-1) == "%") { return match.substring(1); }
    if (!args.length) { return match; }
    var obj = args[0];

    var group = group1 || group2;
    var parts = group.split(",");
    var name = parts.shift();
    var method = map[name.toLowerCase()];
    if (!method) { return match; }

    var obj = args.shift();
    // If a direct function was passed, use that instead
    var replaced;
    if (typeof method === 'function') {
      replaced = method.apply(obj, parts);
    } else {
      replaced = obj[method].apply(obj, parts);
    }

    var first = name.charAt(0);
    if (first != first.toLowerCase()) { replaced = replaced.capitalize(); }

    return replaced;
  }
  return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
}

String.format.map = {
  "s": "toString",
  "key": function() {
    // Used for returning the name of a key.
    return this.name;
  }
}