# configgit

A wrapper for grabbing env vars from either `process.env` or a config file depending on the NODE_ENV.

Heavily (totally) influenced and inspired by a pattern that [@tautologistics](https://github.com/tautologistics) implemented at [Moveline](https://github.com/moveline).

# usage


### config/{env}.json file structure

super-config expects a config/{env}.json convention, something like the following:

```
+--app
+--package.json
+--config
|  +--development.json
|  +--testing.json
|  +--production.json
```

Where development.json looks like:

```json
//development.json
{
  "PORT": "3000",
  "JEDI_NAME": "Dinkus"
}
```

Set your `NODE_ENV` (`configgit` defaults to `'development'`), and....

```javascript
var Config = require('configgit')()

console.log(Config.get("JEDI_NAME")); // Dinkus
```

`configgit` expects a JSON file to exist at `'/config/' + process.env.NODE_ENV.toLowerCase()`.
If one does not, you will see a message logged to the console telling you just that.

###process.env[key] overwrites config/{env}[key]

Any keys added to process.env will overwrite any matching keys in the config file.

Prefix the above example with a `JEDI_NAME="Dorku"`, and run:

```javascript
var Config = require('configgit')()

console.log(Config.get("JEDI_NAME")); // Dorku
```
