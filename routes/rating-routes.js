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
  //create new rating
  //connect new rating to course
  const user = req.body.user; //alterar para withCredentials:true
  const course = req.params.id;
  const courseScore = req.body.courseScore;
  const teacherScore = req.body.teacherScore;
  console.log('course', course);
  console.log('content', courseScore);
  console.log('content', teacherScore);
  console.log('user', user);
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Rating id is not valid'});
    return;
  }
    Rating.create({
      courseScore,
      teacherScore,
      user,
      course
    })
    .then(theRating => {
      res.json(theRating)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    })
});

router.get('/courses/:id/ratings/:rating_id/edit', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Rating id is not valid'});
    return;
  }
  Rating.findById(req.params.id)
  .then(course => {
    res.json(course);
  })
  .catch(error => {
    res.status(500).json(error);
  })
});

router.put('/courses/:id/ratings/:rating_id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Rating id is not valid'});
    return;
  }
  Rating.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({message:`Rating with id ${req.params.id} was updated successfully`});
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

router.delete('/courses/:id/ratings/:rating_id', (req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'id is not valid'});
    return;
  }
  Rating.findByIdAndRemove(req.params.id)
    .then((response) => {
     res.json({message: 'The following rating was successfully deleted: ', response})
    })
    .catch(error => {
      res.status(500).json({message: 'Error occurred: ', error})
    });
});

module.exports = router;