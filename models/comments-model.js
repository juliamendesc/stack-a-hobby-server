const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	content: String,
	user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
	},
	username: String,
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
	},
	title: String,
},{
	timestamps: {
	  createdAt: 'createdAt',
	  updatedAt: 'updatedAt',
	}
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;