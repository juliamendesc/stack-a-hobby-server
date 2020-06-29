const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const courseSchema = new Schema({
  title: String,
  description: String,
  videoURL: String,
  image: String,
  category: String,
}, 
{
  timestamps: true
});
const Course = mongoose.model('Course', userSchema);
module.exports = Course;