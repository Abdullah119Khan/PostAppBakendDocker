const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: String,
  name: String,
  creator: String,
  message: String,
  selectedFile: String,
  tags: [String],
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('post', postSchema)