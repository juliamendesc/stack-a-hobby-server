const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user-model");
// const ratingModel = require("../models/rating-model");
// const Comment = require("../models/comments-model");
const passportConfigs = require("../configs/passport");
const passport = require("passport");

router.get("/user-details", (req, res) => {
  const userId = req.user._id;
  User.findById(userId).then((user) => {
    res.json({ user });
  });
});

// PUT route => to update a specific project
router.put('/users-edit/:userId', (req, res) => {
  const userId = req.params.userId;
  User.findByIdAndUpdate(userId, req.body)
    .then((response) => {
      res.json({ message: `User ${response} was updated succesfully` });
    })
    .catch((error) => {
      res.json(error);
    });
});



module.exports = router;
