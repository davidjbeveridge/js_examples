require('./spec_helper.js');

var User = require('../lib/user');

describe('User', function(){
  describe('save', function(){

    var user, adapter;

    beforeEach(function(){
      adapter = { save: sinon.spy() };
      user = new User(adapter);
    });

    it('errors if name is not set', function(){
      expect(user.save).to.throw(/name required/);
    });

    it('errors if email is not set', function() {
      user.name = "John Smith";
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
  });
});
