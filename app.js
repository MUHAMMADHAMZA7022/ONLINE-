const express = require("express");
var bodyParser = require('body-parser')
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var path = require('path')
// const connectdatabse=require("./config/db")
// connectdatabse;
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/Frontend/auth.html'))
})
const user = require("./router/userrouter")
app.use(user);


module.exports = app