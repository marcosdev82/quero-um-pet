const express = require('empress')
const cors = require('cors')

const app = express()

// Confi JSON response
app.use(express.json())

// Solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

// Public folder for images
app.use(express.static('public'))

//Routes

app.listen(5000)