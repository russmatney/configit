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
      expect(config.env).to.equal("development")
    });

    it('should allow another env to be set', function () {
      process.env.NODE_ENV = 'production';
      var config = Config();
      expect(config.env).to.equal("production")
      delete process.env.NODE_ENV
    });

    it('should lowercase the env name', function () {
      process.env.NODE_ENV = 'weIRDcasiNG';
      var config = Config();
      expect(config.env).to.equal("weirdcasing")
      delete process.env.NODE_ENV
    });
  });

  describe('.get(key)', function() {
    it('should return null if there is no property', function() {
      var config = Config()
      expect(config.get('MISSING_KEY')).to.equal(null)
    });
  });

});

