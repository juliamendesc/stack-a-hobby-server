const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Rating = require('../models/rating-model');

router.get('/courses/:id/ratings', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Comment id is not valid'});
    return;
  }
  Rating.find()
    .then(ratings => {
      res.json(ratings)
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.post('/courses/:id/rating', (req, res) => {
  //lookup course by ID
  //create new comment
  //connect new comment to course
  const user = req.body.user; //alterar para withCredentials:true
  const course = req.params.id;
  const courseScore = req.body.courseScore;
  const teacherScore = req.body.teacherScore;
  console.log('course', course);
  console.log('content', courseScore);
  console.log('content', teacherScore);
  console.log('user', user);
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Comment id is not valid'});
    return;
  }
    Comment.create({
      courseScore,
      teacherScore,
      user,
      course
    })
    .then(theComment => {
      res.json(theComment)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    })
});


module.exports = router;