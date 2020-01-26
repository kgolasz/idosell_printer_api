const express = require('express');
const bodyParser = require('body-parser');
const soap = require('soap');

const app = express();


app.use(bodyParser.json());

// app.get('/',function(req,res) {
//   console.log("GET Request");
//   res.send({  });
// })
app.use('/check',require('./routes/check'));
app.use('/test',require('./routes/test'));
app.use('/print',require('./routes/print'));
app.use('/open',require('./routes/open'));
app.use('/update',require('./routes/systemconfig'));
app.use('/get',require('./routes/get'));

app.use(function(err,req,res,next) {
  res.status(422).send({error : err.message})
});


app.listen(process.env.port || 4025,function(){
  console.log("Application is now listening");
});