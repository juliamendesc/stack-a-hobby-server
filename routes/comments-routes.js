const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comments-model');
const Course = require('../models/course-model');
const User = require('../models/user-model');

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

  const username = req.user.username;
  const user = req.user._id 
  const course = req.params.id;
  const content = req.body.content;
  if(!mongoose.Types.ObjectId.isValid(course)) {
    res.status(400).json({message: 'Comment id is not valid'});
    return;
  }
    Comment.create({
      content,
      user,
      username,
      course
    })
    .then(theComment => {
      Course.findByIdAndUpdate(course, {
        $push: { comments: theComment._id}
      })
      .then(theComment => {
        User.findByIdAndUpdate(user, {
          $push: { comments: theComment._id}
        })
      })
      .then((theComment) => {
        res.json(theComment)
      })
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

router.delete('/courses/:id/comments/:comment_id', (req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'id is not valid'});
    return;
  }
  Comment.findByIdAndRemove(req.params.id)
    .then((response) => {
     res.json({message: 'The following rating was successfully deleted: ', response})
    })
    .catch(error => {
      res.status(500).json({message: 'Error occurred: ', error})
    });
});

module.exports = router;
