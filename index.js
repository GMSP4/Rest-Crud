const express = require("express")
const routes = require("./routes")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")


//MONGODB
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/restapis", {
    useNewUrlParser: true
})

//Create the server
const app = express();
//BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// App Routes
app.use("/", routes())
app.listen(5000)