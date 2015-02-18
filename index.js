var configCache = {};

module.exports = function() {

  configCache = {};

  function getNodeEnv() {
    var env = process.env.NODE_ENV || "development";
    return env.toLowerCase()
  }

  var configFromFile = {};
  try {
    configFromFile = require(process.cwd() + '/config/' + getNodeEnv() + '.json');
  } catch(err) {
    console.log("Error loading config file. Check that /config/" + getNodeEnv() + ".json exists");
  }

  for (var key in configFromFile) {
    configCache[key] = configFromFile[key];
  }

  //overwrite configCache with process.env
  for (var key in process.env) {
    configCache[key] = process.env[key];
  }

  return {
    env: getNodeEnv(),
    get: function(key) {
      if (configCache[key])
        return configCache[key];
      else
        return null;
    },
    _cache: configCache
  }
}
