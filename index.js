var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express();



app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sign_up', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;

    var data = {
        "name": name,
        "email":email,
        "password":pass,
        "phone":phone
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.sendFile(__dirname+"/signup_success.html");
})
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.get("/form",function(req,res){
  res.sendFile(__dirname+"/form.html");
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
