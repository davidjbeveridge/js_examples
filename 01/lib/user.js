function User(adapter) {
  this.adapter = adapter;
  this.save = this.save.bind(this);
}

User.prototype = {
  save: function() {
    if(!this.name) throw new Error('name required');
    if(!this.email) throw new Error('email required');
    if(!/.+@.+\..+/.test(this.email)) throw new Error('email is not the correct format');
    this.adapter.save(this);
  }
};

module.exports = User;
