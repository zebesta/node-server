var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var jsonfile = require('jsonfile')
var file = 'data.json'

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       position:1,
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   var listOfNames = [response, response, response]
   listOfNames.push(response);
   console.log(response);
  jsonfile.writeFile(file, listOfNames, {spaces: 2}, function(err) {
    console.error(err);
  })
   res.end(JSON.stringify(listOfNames));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
