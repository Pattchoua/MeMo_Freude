const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: true }, 

    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },

}, 
{ timestamps: true });

commentSchema.post('save', async function () {
    const Comment = this.constructor;
    const postId = this.post;
    const count = await Comment.countDocuments({ post: postId });
    
    // Update the commentsCount field in the related post
    await mongoose.model('Post').findByIdAndUpdate(postId, { commentsCount: count });
  });

const model = mongoose.model('Comment', commentSchema);

module.exports = model;
