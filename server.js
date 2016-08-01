var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var jsonfile = require('jsonfile')
var file = 'names.json'

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

//create intial database
app.post('/process_post', urlencodedParser, function (req, res) {

   // Prepare output in JSON format
   response = {
       position:1,
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   var listOfNames = [response]
   console.log(listOfNames);
   jsonfile.writeFile(file, listOfNames, {spaces: 2}, function(err) {
     console.error(err);
   })
   res.end(JSON.stringify(response));
})

//append to JSON file by adding to end
app.post('/process_append', urlencodedParser, function (req, res) {
  //get existing JSON
   var nameFile = fs.readFileSync(file);
   var names = JSON.parse(nameFile);
   // Prepare output in JSON format
   response = {
       position:(names.length + 1),
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   names.push(response);
   var namesJSON = JSON.stringify(names);
   fs.writeFileSync(file, namesJSON);
   res.end(namesJSON);
})

app.get('/test', function(req, res, next) {
  var nameFile = fs.readFileSync(file);
  var names = JSON.parse(nameFile);
  res.json(names);
});
app.get('/testing', function (req, res) {
   res.sendFile( __dirname + "/" + "testing.htm" );
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
