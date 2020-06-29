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
})

module.exports = router;