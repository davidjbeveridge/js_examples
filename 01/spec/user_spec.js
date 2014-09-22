require('./spec_helper.js');

var User = require('../lib/user');

describe('User', function(){
  describe('#save', function(){

    var user, adapter;

    beforeEach(function(){
      adapter = { save: sinon.spy() };
      user = new User(adapter);
    });

    it('errors if name is not set', function(){
      user.name = "";
      expect(user.save).to.throw(/name required/);
    });

    it('errors if email is not set', function() {
      user.name = "John Smith";
      user.email = "";
      expect(user.save).to.throw(/email required/);
    });

    it('errors if email does not match the correct format', function() {
      user.name = "John Smith";
      user.email = "asdf123";
      expect(user.save).to.throw(/email is not the correct format/);
    });

    it('persists if all data is valid', function() {
      user.name = "John Smith";
      user.email = "john.smith@example.com";
      user.save();
      expect(adapter.save).to.be.calledWith(user);
    });

    it('clears the dirty flag if all is well', function(){
      user.name = "John Smith";
      user.email = "john.smith@example.com";
      user.save();
      expect(user.dirty()).to.equal(false);
    });
  });

  describe('#dirty', function() {
    var user, adapter;

    beforeEach(function(){
      adapter = { save: sinon.spy() };
      user = new User(adapter);
    });

    it('returns true when name has changed', function(){
      user.name = "John Smith";
      expect(user.dirty()).to.equal(true);
    });

    it('returns false if name has not changed', function(){
      expect(user.dirty()).to.equal(false);
    });

    it('returns true when email has changed', function(){
      user.email = "john.smith@example.com";
      expect(user.dirty()).to.equal(true);
    });

    it('returns false if email has not changed', function(){
      expect(user.dirty()).to.equal(false);
    });
  });
});
