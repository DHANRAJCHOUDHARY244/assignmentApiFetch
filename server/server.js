const apiRoutes = require('./models/api')
const express = require('express')
const entry = require('./models/insertData')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
app.use(express.json())
app.use(cors())

app.use(apiRoutes)
// entry()
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
