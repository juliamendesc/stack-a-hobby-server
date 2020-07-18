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
  imageUrl: String, 
  ratings: [
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Rating"
    }
 ],
<<<<<<< HEAD
  imageUrl: { type: String, 
    // required: true, 
    default: "https://res.cloudinary.com/jmc10/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1594582163/myFolder/default-user.png.png" }
}, 

=======
 comments: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
],
},
>>>>>>> f511a01eb1c890ca7e12182f41bc1bc8b43ddb17
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
  
});
const User = mongoose.model('User', userSchema);
module.exports = User;