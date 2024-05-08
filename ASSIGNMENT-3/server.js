const express = require("express");
let server = express();
const layout = require("express-ejs-layouts")
server.use(express.static("public"));
server.use(layout)

server.set("view engine", "ejs");

server.get("/", function(req, res){
    res.render("landingpage") 

});
server.get("/landingpage", function(req, res){
    res.render("landingpage") 

});

server.get("/contact", function(req, res){
    res.render("contact") 

});

server.listen(4000)