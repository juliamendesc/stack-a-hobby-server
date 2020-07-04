const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    courseScore: Number,
    teacherScore: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
