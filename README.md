# super-config

A wrapper for grabbing env vars from either `process.env` or a config file depending on the NODE_ENV.

Heavily (totally) influenced and inspired by a pattern that [@tautologistics](https://github.com/tautologistics) implemented at [Moveline](https://github.com/moveline).

# usage

```javascript
var Config = require('super-config')()

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Sup boo');
}).listen(Config.get("PORT"), "127.0.0.1");
```

Config expects a JSON file to exist at `'/config/' + process.env.NODE_ENV`.

So if `NODE_ENV == 'development'` and your `'config/development.json'` reads like:

```json
//development.json
{
  "PORT": "3000"
}
```

Then `Config.get("PORT") == "3000"`

*This may change, but* anything added directly to process.env will overwrite the current env's config properties.
