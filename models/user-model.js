const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
  // isTeacher: { Boolean, default: false},
   email: String,
  dateOfBirth: Date,
  name: {
    first: { type:String, name:'First Name', required:true },
    last: { type:String, name:'Last Name', required:true }
  }
}, 
{
  timestamps: true
});
const User = mongoose.model('User', userSchema);
module.exports = User;