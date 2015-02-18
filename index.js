var configData = {};

module.exports = function() {

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
    configData[key] = configFromFile[key];
  }

  //overwrite configData with process.env
  for (var key in process.env) {
    configData[key] = process.env[key];
  }

  return {
    env: getNodeEnv(),
    get: function(key) {
      if (configData[key])
        return configData[key];
      else
        return null;
    },
    _cache: configData
  }
}
