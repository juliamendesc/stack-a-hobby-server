const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user-model');

//GET route => to get all the projects
router.get('/profile', (req, res) => {
  // Gets data from mongoDB
  User.find()
    .then(allUsers => {
      // will do something with the result
      res.json(allUsers);
    })
    .catch(err => {
      // will do something else
      res.json(err);
    })
});


// //POST route => to create a new project
// router.post('/profile', (req, res) => {
//   const { title, description } = req.body;
//   Project.create({
//     title,
//     description,
//     tasks: []
//   })
//     .then(response => {
//       res.json(response);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });


//GET route => get a specific project using the id
router.get('/users/:id', (req, res) => {
  const { email, dateOfBirth, firstName,lastName } = req.body;
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({message: 'id is not valid'});
    return;
  }
  
  User.findById(req.params.id)
    // getting all the tasks for this project
    .populate('tasks')
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    })
});

// PUT route => to update a specific project
router.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
      .then((response) => {
        console.log('response', response);
        res.json({ message: `User ${response} was updated succesfully`});
      })
      .catch(error => {
        res.json(error);
      }) 
});


// DELETE route => to delete a specific project
router.delete('/users/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid'});
  }

  Project.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.json({ message: response})
    })
    .catch(error => {
      res.status(500).json({ message: `Error occurred: ${error}`});
    });
});

module.exports = router;