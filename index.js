//jshint esversion:6

// requirements for our project
const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");

// app is an express object
app = express();

// setting the body parser so we can get html elements from html.index
app.use(bodyParser({extended:true}));

// The get request for the root route
app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html")
});

// return a page after submit button has been clicked
app.post("/", function(req, res){

  var options = {
    //uniform resource locator refrencing an API with the https protcol
    url:'https://apiv2.bitcoinaverage.com/convert/global',
    //Get Request
    method: "GET",
    // Query Strings
    qs:{
      //parameters set by the api
      from: req.body.crypto,
      to: req.body.fiat,
      amount:req.body.amount
    }

  };

  // request the api
  request(options, function(error, response, body){
    var data = JSON.parse(body);
    res.write("<p>Date:"+data.time+"</p>")
    res.write("<h1>The price of " + req.body.amount + " " + req.body.crypto + " is " + data.price + req.body.fiat +"</h1>");
    res.send();
  })
})

// Host application on port 3000
app.listen(3000, function(){
  console.log("The app is running on port 3000");
})
