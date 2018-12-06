let mongoose = require('mongoose');
let crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config')

let UserSchema = new mongoose.Schema({
  email: {type: String, lowercase: true, required: [true, 'can\'t be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  hash: String,
  salt: String,
  token: String
}, {timestamps: true});




UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword  = function(password) {
 let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
 return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  // 1 hour
  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  }, config.secret);
}

UserSchema.methods.toAuthJSON = function() {
  let token = this.generateJWT();
  this.token = token;
  this.save(err => {
    console.log(err);
  });
  return {
    _id: this._id,
    email: this.email,
    token: token,
  };
};


const Users = mongoose.model('Users', UserSchema);

module.exports = Users;