const mongoose = require('mongoose')

const mongoUrl = 'mongodb://mongo:27017/postApp';

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(`Connected`)
})
.catch((err) => {
  console.log(`Error ${err}`)
})