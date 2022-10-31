const express = require('express');
const { createPost, getAllPost, updatePost, deletePost, likePost, getPostBySearch } = require('../controllers/post');
const router = express.Router()
const auth = require('../auth/auth')

router.get('/post', getAllPost)
router.get('/post/search', getPostBySearch)
router.post('/post/create', auth, createPost)
router.put('/post/update/:id', auth, updatePost)
router.delete('/post/delete/:id', auth, deletePost)
router.put('/post/:id/like', auth, likePost)


module.exports = router;