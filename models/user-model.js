const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  isTeacher: { Boolean, default: false},
  email: String,
  dateOfBirth: Date,
  firstName: { type:String, required:true },
  lastName: { type:String, required:true }
}, 
{
  timestamps: true
});
const User = mongoose.model('User', userSchema);
module.exports = User;