const request = require('request')

const weather=(latitude,longitude,callback) =>{
  const url = 'http://api.weatherstack.com/current?access_key=4aa785bfacb11c54049dc64eb90905d8&query='+latitude+','+longitude+'&units=m'
  request({url,json:true} , (error, {body} )=> {   //if there is a error then there won't be response and vice versa
 //  const data = JSON.parse(response.body);       when json:true was not added
//  console.log(data.current);
 //  console.log(response.body.current);
    if(error){
     callback("Unable to connect to weather service!",undefined);
   }
   else if(body.error){
          callback('Unable to find location',undefined);
   }
   else{
      callback(undefined ,'The weather is '+ body.current.weather_descriptions+'. The temperature is '+body.current.temperature+' degrees and the rain probablity is '+body.current.precip+'%.')

   }
 })
}

module.exports=weather;
