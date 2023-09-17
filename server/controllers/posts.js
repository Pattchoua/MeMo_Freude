
const Post = require('../models/post')
const cloudinary = require('../config/cloudinary');
const Comment = require('../models/comment');


//  Getting all Posts (all users can see)
const getPosts = async (req, res) => {  
    try {
        const posts = await Post.find().populate('createdBy', 'username')
        console.log("🚀 ~ file: posts.js:12 ~ getPosts ~ posts:", posts)
        res.status(200).json(posts)
    } catch (error) {
        console.log("🚀 ~ file: posts.js:15 ~ getPosts ~ error:", error)
        res.status(500).json({Error:'Error fetching posts'})
    }
}


// Fetch all posts created by a specific user
const getPostsCreatedByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const posts = await Post.find({ createdBy: userId }).populate('comments');
        console.log("🚀 ~ file: posts.js:27 ~ getPostsCreatedByUser ~ posts :", posts )
        res.status(200).json(posts);
    } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Error fetching user posts' });
  }
};



// fetching a post created by a specific user

const getPostCreatedByUser = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findById(postId).populate({
            path: 'comments',
            populate: {
                path: 'createdBy',
                select: 'username',
            },
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching specific user post:', error);
        res.status(500).json({ error: 'Error fetching specific user post' });
    }
};





const updatePostCreatedByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.id; 

        // Check if a new image file was uploaded
        let imageUrl = null;
        if (req.file) {
            // Upload the new image to Cloudinary and get the secure URL
            const uploadedFile = await cloudinary.uploader.upload(req.file.path);
            imageUrl = uploadedFile.secure_url;
        }

        const updatedData = {
            title: req.body.title,
            message: req.body.message,
            tags: req.body.tags,
            location: req.body.location,
            // Add the image URL if it's available
            image: imageUrl || req.body.image,
        };

        // Update the Post in the database
        const updatedPost = await Post.findOneAndUpdate(
            { _id: postId, createdBy: userId }, 
            updatedData,    
            { new: true } 
        );

        if (!updatedPost) {
            return res.status(404).json({ Error: 'Post not Found!' });
        }

        res.status(202).json(updatedPost);
    } catch (error) {
        console.log("🚀 ~ file: posts.js:75 ~ updatePostCreatedByUser ~ error:", error);
        res.status(500).json({ Error: 'Internal Server Error' });
    }
};



// controller for Creating a NewPost with an uploaded file
const createPost = async (req, res) => {
    try {
        const NewPost = await Post.create({ ...req.body, image: req.file.path, createdBy: req.user._id  });
        console.log("🚀 ~ file: posts.js:39 ~ createPost ~ NewPost:", NewPost)
        res.status(201).json(NewPost)
    } catch (error) {
        console.log("🚀 ~ file: posts.js:42 ~ createPost ~ error:", error)
        res.status(500).json({Error:'Internal server Error'})
    }
}


// deleting an existing post
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        
        // Find the post by ID and createdBy to ensure the user is the creator
        const deletedPost = await Post.findOneAndDelete({ _id: postId });
        console.log("🚀 ~ file: posts.js:119 ~ deletePost ~ deletedPost :", deletedPost )
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found or you are not the creator' });
        }
        res.status(200).json(deletedPost)   
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// Fetch all comments for a specific post
const getCommentsForPost = async (req, res) => {
    try {
        const postId = req.params.id; 

        // Fetch the comments for the post
        const comments = await Comment.find({ post: postId }).populate('createdBy', 'username');

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments for post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const { text } = req.body;
        const createdBy = req.user._id;

        const post = await Post.findById({ _id: postId });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Create the new comment
        const newComment = await Comment.create({
            text,
            createdBy:createdBy,
            post: postId,
        });

        // Update the post to include the newly created comment
        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const postId = req.params.postId;

        // Find the comment by ID
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if the comment belongs to the specified post
        if (comment.post.toString() !== postId) {
            return res.status(403).json({ error: 'Comment does not belong to this post' });
        }

        // Delete the comment
        await comment.remove();

        // Update the post's comment count
        const post = await Post.findById(postId);
        post.comments.pull(commentId);
        post.commentsCount -= 1;
        await post.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// Controller to like a post
const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
        return res.status(404).json({ error: 'Post not found' });
        }

        if (post.likes.includes(userId)) {
        // User already liked the post, so remove the like
        post.likes = post.likes.filter((like) => like.toString() !== userId.toString());
        } else {
        // User hasn't liked the post, so add the like
        post.likes.push(userId);
        }
        
        await post.save();
        res.status(200).json({ message: 'Post liked successfully', likes: post.likes });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    getPosts,
    getPostsCreatedByUser,
    getPostCreatedByUser,
    updatePostCreatedByUser,
    createPost,
    deletePost,
    getCommentsForPost,
    deleteComment,
    addComment,
    likePost,
};
