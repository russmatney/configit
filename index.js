module.exports = function() {

  function getNodeEnv() {
    var env = process.env.NODE_ENV || "development";
    return env.toLowerCase()
  }

  return {
    env: getNodeEnv()
  }
}
