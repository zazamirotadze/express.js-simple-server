var express = require('express')
var app = express()
const home = require("./routes/home")
const genres = require("./routes/genres")
const bodyParser = require('body-parser')



// to get data when we are doing crud operations in text format
app.use(bodyParser.text({ type: 'text/plain' }))
//
//  "/" - endpoint
app.use("/", home)
//
// "/api/genres" -endpoint
app.use("/api/genres", genres)
//






// the port where actions are taken
app.listen(3000)
//