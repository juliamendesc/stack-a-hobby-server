const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	content: String,
	user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
	}
},{
	timestamps: {
	  createdAt: 'createdAt',
	  updatedAt: 'updatedAt',
	}
  }
);

module.exports = mongoose.model('Comment', commentSchema);