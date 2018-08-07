const req = require('request');
var getweather = (lat,lng,callback) => {
  req({
    url: `https://api.darksky.net/forecast/143675b35e508e45ae28f824266b7651/${lat},${lng}`,
    json: true
  },(error,response,body)=>{
    if (response.statusCode === 400) {
      callback('unable to find');
    }
    else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }

  });

};
module.exports.getweather=getweather;
