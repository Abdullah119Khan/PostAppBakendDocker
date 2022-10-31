const Post = require('../models/Post')

// Get All Post
exports.getAllPost = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await Post.countDocuments({})

    const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

    return res.status(200).json({ data: posts, currentPage: Number(page), numberOfPage: Math.ceil(total / LIMIT)})
  } catch(err) {
    return res.status(500).json(err)
  }
}

// Get Post BY Search
exports.getPostBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, 'i')
    const post = await Post.find({ $or: [ { title }, { tags: { $in: tags.split(',') } }] })
    return res.status(200).json({ data: post})
  } catch(err) {
    return res.status(500).json(err)
  }
}

// Create Post
exports.createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({...post, creator: req.userId, createdAt: new Date().toISOString()})

  try {
    const savedPost = await newPost.save()
    return res.status(201).json(savedPost)
  } catch(err) {
    return res.status(500).json(err)
  }
}

// Update Post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, creator, message, tags, selectedFile } = req.body;

  try {
    const newPost = { title, creator, message, tags, selectedFile, _id: id }
    const updatePost = await Post.findByIdAndUpdate(id, newPost, { new: true })
    return res.status(200).json(updatePost)
  } catch(err) {
    return res.status(500).json(err)
  }
}

// Delete Post
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id)
    return res.status(200).json('Post Delete success')
  } catch(err) {
    return res.status(500).json(err)
  }
}

// Like Post
exports.likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    const index = await post.likes.findIndex((id) => id === String(req.userId))

    if(index == -1) {
      post.likes.push(String(req.userId))
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId))
    }

    const updatePost = await Post.findByIdAndUpdate(id, post, { new: true })
    return res.status(200).json(updatePost)
  } catch(err) {
    return res.status(500).json(err)
  }
} 