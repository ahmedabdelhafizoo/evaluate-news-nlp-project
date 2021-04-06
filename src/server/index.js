var path = require('path')

const express = require('express')

const analyzeUrl = require('./analyzeUrl.js')

// Enable All CORS Requests (to able to call the api from the client side on port 8000)
var cors = require('cors')

const app = express()

app.use(cors())

app.use(express.static(path.resolve('../../dist')))

app.get('/', function (req, res) {
    res.sendFile(path.resolve('../../dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/api/analyzeUrl', analyzeUrl)

module.exports.app = app;