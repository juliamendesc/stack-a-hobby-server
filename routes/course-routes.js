const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course-model');

//GET route => to get all the projects
router.get('/courses', (req,res) => {
    // Gets data from mongoDB
    Course.find()
    .then(allCourses => {
      console.log(allCourses)
      // will do something with the result
      res.json(allCourses);
    })
    .catch(err => {
      // will do something else
      res.status(500).json(err);
    })
});

//GET route => get a specific project using the id
router.get('/courses/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'id is not valid'});
    return;
  }
  
  // Getting all the tasks for this project
    Course.findById(req.params.id)
      // .populate('tasks')
      .then(course => {
        res.json(course);
      })
      .catch(error => {
        res.status(500).json(error);
      })
  });


// GET route to UPDATE a specific project
    // PATCH to update ONE field
    // PUT to update ALL fields
router.put('/courses/:id', (req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'id is not valid'});
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

// POST route => to create a new project
router.post('/courses', (req,res) => {
  const { title, description, videoURL, image, category } = req.body;
  Course.create({
    title,
    description,
    videoURL,
    image,
    category,
  })
  .then(response => {
    console.log('Course has been created')
    res.json(response);
  })
  .catch(err => {
    res.status(500).json(err);
  })
});

// DELETE route => to delete a specific project
router.delete('/courses/:id', (req,res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'id is not valid'});
    return;
  }
  Course.findByIdAndRemove(req.params.id)
    .then((response) => {
     res.json({message: 'The following project was successfully deleted: ', response})
    })
    .catch(error => {
      res.status(500).json({message: 'Error occurred: ', error})
    });
});

module.exports = router;