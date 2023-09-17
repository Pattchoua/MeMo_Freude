const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPostsCreatedByUser,
    getPostCreatedByUser,
    updatePostCreatedByUser,
    createPost,
    deletePost,
    addComment, 
    likePost, 
    getCommentsForPost, 
} = require('../controllers/posts');

const authenticate = require('../middlewares/auth');
const upload = require('../config/multer');

router.use(authenticate);

router.get('/users/:userId/posts', getPostsCreatedByUser);
router.get('/users/:userId/posts/:id', getPostCreatedByUser);
router.get('/posts/:id/comments', getCommentsForPost); 

router.put('/users/:userId/posts/:id/update', upload.single('image'), updatePostCreatedByUser);

router.post('/', upload.single('image'), createPost);
router.delete('/:id', deletePost);

router.post('/:id/comment', addComment); 
router.post('/:id/like', likePost); 

router.get('/', getPosts);

module.exports = router;
