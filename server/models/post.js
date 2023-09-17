const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// Define a mongoose schema for the 'PostMessage' model
const postSchema = mongoose.Schema(
    {
        title: { type: String, required: [true, 'Title is required'] },
        message: { type: String, required: [true, 'Message is required'] },
        location: { type: [String], required: [true, 'Location is required'] },
        tags: { type: [String], required: [true, 'Tags are required'] },
        image: { type: String },
        commentsCount: {
          type: Number,
          default: 0, 
        },
        createdBy: { type: mongoose.Types.ObjectId, ref: 'User', required: [true, 'userId is required'] },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], 
        likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }], 
  },
    { timestamps: true }
);

// Define a pre-save middleware for the postSchema
postSchema.pre('save', async function (next) {
    try {
        const options = {
            public_id: this._id,
            folder: process.env.CLOUDINARY_POSTS_FOLDER_NAME,
        };

        // Use the Cloudinary API to delete the file by public_id
        await cloudinary.uploader.destroy(options.public_id);

      const imagePath = this.image;
      const res = await cloudinary.uploader.upload(imagePath, options);
      this.image = res.secure_url;
      //fs.unlinkSync(imagePath);


        next();
    } catch (e) {
        next(e.message);
    }
});

// Creating a mongoose model named 'Post' using the defined postSchema
const model = mongoose.model('Post', postSchema);

module.exports = model;
