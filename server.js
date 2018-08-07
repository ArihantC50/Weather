const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const hbs = require('hbs');
var app = express();
app.set('view engine','hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('/public'));
app.get('/',(req,res)=>{
  res.render('index.hbs');
});

app.post('/',(req,res)=>{
  let city =  req.body.search;

  request({
    url : `http://maps.googleapis.com/maps/api/geocode/json?address=${city}`,
  json: true
},(error,response,body) => {

    //console.log(JSON.stringify(response, undefined, 2));
  if (error) {
    res.render('index.hbs',error);
  }

  else if (body.status === 'OK') {
    var address = `It is ${body.results[0].formatted_address}`;
      res.render('index.hbs',{
        location: address
      });
    }
  });


  // res.render('index.hbs');
});

app.listen(3000,()=>{
  console.log('Server is up on Port 3000');
});
