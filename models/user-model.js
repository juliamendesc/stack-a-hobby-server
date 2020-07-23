const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  googleId: String,
  isTeacher: { Boolean, default: false},
  email: String,
  dateOfBirth: Date,
  firstName: String,
  lastName: String,
  imageUrl: String, 
 comments: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
],
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
  ],
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
  
});
const User = mongoose.model('User', userSchema);

module.exports = User;