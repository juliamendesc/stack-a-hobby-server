const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course-model');

router.get('/courses', (req,res) => {
  Course.find()
    .then(allCourses => {
      res.json(allCourses);
  })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.get('/courses/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Course id is not valid'});
    return;
  }
  Course.findById(req.params.id)
    .populate('comments')
    .then(course => {
      res.json(course);
    })
    .catch(error => {
      res.status(500).json(error);
    })
  });

router.put('/courses/:id', (req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Course id is not valid'});
    return;
  }
  Course.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({message:`Course with id ${req.params.id} was updated successfully`});
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

router.post('/courses', (req,res) => {
  const { title, description, videoURL, category, imageURL } = req.body;
  const author = req.user._id;
  const username = req.user.username;
  Course.create({
    title,
    description,
    videoURL,
    category,
    imageURL,
    author,
    username
  })
  .then(response => {
    console.log('Course has been created')
    res.json(response);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

router.delete('/courses/:id', (req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Course id is not valid'});
    return;
  }
  Course.findByIdAndRemove(req.params.id)
    .then((response) => {
     res.json({message: 'The following course was successfully deleted: ', response})
    })
    .catch(error => {
      res.status(500).json({message: 'Error occurred: ', error})
    });
});

module.exports = router;