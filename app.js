var express = require('express');
var bodyParser = require('body-parser');
var api = require('./src/routes');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res)=>{
    res.send({message: "Hello World!"});
});
app.use("/api", api)

app.listen(3000);