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
	courseTitle: String,
},{
	timestamps: {
	  createdAt: 'createdAt',
	  updatedAt: 'updatedAt',
	}
  }
);

module.exports = mongoose.model('Comment', commentSchema);