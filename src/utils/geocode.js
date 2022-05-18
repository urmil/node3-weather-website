const request = require('request')



const geocode =  (address, callback) => {

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidXJtaWxzd2Fyb29wIiwiYSI6ImNsM2JtY3p1ZjA4d2szY3FuZTRwaXUxeWIifQ.uJVuRkaxqm4QPmrBGiXb3w'
      //encodeURLComponent fucntion is used for encode any special char like ? to %3F
 
      request ({url,json:true},(error,{body})=>{
         //console.log(resp)
        if(error){
           callback('Unable to connect the Host!',undifiend)
        }else if(body.features.length===0) {
           callback('Unable to get Location,Please try again with correct address',undefined)
        }else {
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
       // console.log(body.features[0].center[0]+'-----'+body.features[0].center[0])
     })
 }

 module.exports= geocode