const express = require('express');
const router = express.Router();
const uploadCloud = require('../configs/cloudinary.js');
const Image = require('../models/image-model');

router.get('/images', (req, res, next) => {
  Image.find()
    .then(imagesFromDB => res.status(200).json(imagesFromDB))
    .catch(err => next(err));
});

router.post('/images/create', (req, res, next) => {
  
  Image.create(req.body)
    .then(newImage => {
      res.status(200).json(newImage);
    })
    .catch(err => next(err));
});

 
router.post('/upload', uploadCloud.single("imageUrl"), (req, res, next) => {
  if(req.file){
    res.json({ imageUrl: req.file.secure_url });
  }else{
    res.json({ imageUrl:"https://res.cloudinary.com/jmc10/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1594582163/myFolder/default-user.png.png"});
  }
})


module.exports = router;