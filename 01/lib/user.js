function attrAccessor(obj, attrName) {
  var attrValue;
  Object.defineProperty(obj, attrName, {
    get: function(){
      return attrValue;
    },
    set: function(value){
      obj._dirty = true;
      attrValue = value;
    }
  });
}

function attrAccessors(obj, attrNames) {
  attrNames.forEach(function(attr){
    attrAccessor(obj, attr);
  });
}

function User(adapter) {
  this.adapter = adapter;
  this.save = this.save.bind(this);
  this._dirty = false;

  attrAccessors(this, ['name', 'email']);
}

User.validateFormat = function(attr, format) {
  User.validators = User.validators || [];
  User.validators.push(function(user) {
    if(!format.test(user[attr])) return [attr, 'is not the correct format'];
  });
};

User.validatePresence = function(attr) {
  User.validators = User.validators || [];
  User.validators.push(function(user) {
    if(!user[attr]) return [attr, 'required'];
  });
};

User.validatePresence('name');
User.validatePresence('email');
User.validateFormat('email', /.+@.+\..+/);

User.prototype = {
  save: function() {
    this.validate();
    this.adapter.save(this);
    this._dirty = false;
  },

  dirty: function() {
    return this._dirty;
  },

  validate: function() {
    User.validators.forEach(function(validator){
      var err = validator(this);
      if(err) throw new Error(err.join(' '));
    }, this);
  }
};

module.exports = User;
