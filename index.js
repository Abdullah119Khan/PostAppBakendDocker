const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')

dotenv.config({ path: 'config.env'})
require('./dbConn/dbConn')

const PORT = process.env.PORT || 8000;


app.use(bodyParser.json({ limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}))
app.use(cors())

app.use('/api', postRoutes)
app.use('/api', userRoutes)

app.listen(PORT, () => {
  console.log(`Server Running On PORT ${PORT}`)
})