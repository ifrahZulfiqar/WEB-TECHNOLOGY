const express = require("express");
let server = express();
server.use(express.static("PUBLIC"));
server.set("view engine", "ejs");
server.get("/api/stories", function(req, res){
    res.send([
        {title: "Story1", content: "red riding hood"},
        {title: "Story2", content: "beauty and the beast"},
    ])
});

server.listen(4000)