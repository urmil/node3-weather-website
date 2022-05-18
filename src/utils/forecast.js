const request =require('request')


const forecast = (longitude,latitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=ca470d3ed155ca280e1c9885a4ebdee7&query='+latitude+','+longitude+'&units=m'
    console.log(url)
    request({url,json:true},(error,{body})=>{
        if(error){
           callback('Unable to connect the Weather-app', undefined)
        }else if(body.error){
           callback('Unable to get the correct response',undefined)
        }else{
           callback(undefined,'Weather is '+body.current.weather_descriptions[0]+'. Temperature is '+ body.current.temperature+
           ' degree out but it feels like '+ body.current.feelslike + ' degree. Humidity is '+body.current.humidity+ 
           '% and Wind speed is around '+body.current.wind_speed+' km/hr to '+body.current.wind_dir + '. Current UV_Index ' + body.current.uv_index  )
        }

    })

}

module.exports =forecast