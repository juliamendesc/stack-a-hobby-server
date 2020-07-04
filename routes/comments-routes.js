const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comments-model');

router.get('/courses/:id/comments', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Comment id is not valid'});
    return;
  }
  Comment.find()
    .then(comments => {
      res.json(comments)
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.post('/courses/:id/comments', (req, res) => {
  //lookup course by ID
  //create new comment
  //connect new comment to course
  const user = req.body.user; //alterar para withCredentials:true
  const course = req.params.id;
  const content = req.body.content;
  console.log('course', course);
  console.log('content', content);
  console.log('user', user);
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Comment id is not valid'});
    return;
  }
    Comment.create({
      content,
      user,
      course
        // comment.save();
        // course.comments.push(comment);
        // course.save();
        // res.redirect("/courses/" + course._id);
      })
    .then(theComment => {
      res.json(theComment)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    })
});

// Comment EDIT route
router.get('/courses/:id/comments/:comment_id/edit', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Comment id is not valid'});
    return;
  }
  Comment.findById(req.params.id)
  .then(course => {
    res.json(course);
  })
  .catch(error => {
    res.status(500).json(error);
  })
});

// // Comment UPDATE route
router.put('/courses/:id/comments/:comment_id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'Comment id is not valid'});
    return;
  }
  Comment.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({message:`Comment with id ${req.params.id} was updated successfully`});
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

module.exports = router;
