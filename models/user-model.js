const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  googleId: String,
  isTeacher: { Boolean, default: false},
  email: String,
  dateOfBirth: Date,
  firstName: { type:String, required:true },
  lastName: { type:String, required:true },
  ratings: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Rating"
    }
 ],
  imageUrl: { type: String, 
    // required: true, 
    default: "https://res.cloudinary.com/jmc10/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1594582163/myFolder/default-user.png.png" }
}, 

{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
  
});
const User = mongoose.model('User', userSchema);
module.exports = User;