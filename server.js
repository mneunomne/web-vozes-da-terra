var express = require('express');
var fs = require('fs');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
})

app.post('/audios/', function(req, res, next) {
  var data = '';
  // Handle the post for this route
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    console.log('POST data received');
    fs.writeFile('./audios/data.json', data, 'utf-8', function (err) {
      if (err) {
        throw err;
      } else {
        res.send({
          status: 'success',
          code: 200
        })
      }
    })
  });
});
