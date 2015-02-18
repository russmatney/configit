module.exports = function() {

  function getNodeEnv() {
    var env = process.env.NODE_ENV || "development";
    return env.toLowerCase()
  }

  return {
    env: getNodeEnv(),
    get: function(key) {
      if (process.env[key])
        return process.env[key];
      else
        return null;
    }
  }
}
