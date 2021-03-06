var expect = require('chai').expect;

var Config = require('../index.js');

describe('Config', function() {
  it('should exist', function() {
    expect(Config).to.exist;
  });

  describe('init', function() {
    it('should initialize itself cleanly', function() {
      expect(Config()).to.be.instanceof(Object);
    });
  });

  describe('env handling', function() {
    it('should default to the "development" environment', function () {
      var config = Config();
      expect(config.env).to.equal("development");
    });

    it('should allow another env to be set', function () {
      process.env.NODE_ENV = 'production';
      var config = Config();
      expect(config.env).to.equal("production");
      delete process.env.NODE_ENV;
    });

    it('should lowercase the env name', function () {
      process.env.NODE_ENV = 'PRODuctioN';
      var config = Config();
      expect(config.env).to.equal("production");
      delete process.env.NODE_ENV;
    });
  });

  describe('.get(key)', function() {
    it('should return null if there is no property', function() {
      var config = Config();
      expect(config.get('MISSING_KEY')).to.equal(null);
    });

    describe('config/[env].json vs. process.env', function() {

      it('should return props that are on process.env', function() {
        process.env.NUM_JEDIS = '9001';
        var config = Config();
        expect(config.get('NUM_JEDIS')).to.equal('9001');
        delete process.env.NUM_JEDIS;
      });

      it('should return props from a config/[env].json file', function() {
        var config = Config();
        expect(config.get('NUM_SITH_LORDS')).to.equal('1');
      });

      it('should overwrite config/[env].json props with process.env props', function() {
        var config = Config();
        expect(config.get('NUM_SITH_LORDS')).to.equal('1');

        process.env.NUM_SITH_LORDS = '999';
        var config = Config();
        expect(config.get('NUM_SITH_LORDS')).to.equal('999');
        delete process.env.NUM_SITH_LORDS;
      });
    });

    describe('correct [env].json file selection', function() {
      it('should load the correct config data based on the NODE_ENV', function() {
        var config = Config();
        expect(config.get('JEDI_ENV')).to.equal('Secret Jedi Training Academy')

        process.env.NODE_ENV = 'production';
        var config = Config();
        expect(config.get('JEDI_ENV')).to.equal('Anywhere in the galaxy')
        delete process.env.NODE_ENV;
      });
    });

  });
});

