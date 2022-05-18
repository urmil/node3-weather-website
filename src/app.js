const path =require('path')
const express = require('express')
var hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//console.log(__dirname)
///console.log(path.join(__dirname,'../web-server/public'))

//define paths for Express config
const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
console.log(publicDirectoryPath)

//setup handlebars engin and views location
app.set('view engine','hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectoryPath)) //customiz your webserver

app.get('', (req, res)=> {
    res.render('index',{

        title: 'Weather',
        name: 'Urmil Swaroop Pandey'
    })
})

app.get('/about',(req,res)=>{
     res.render('about',{
    title: 'About',
    name: 'Urmil Swaroop Pandey'
})
})
app.get('/help',(req,res)=>{
    res.render('help',{
   title: 'Help',
   name: 'Urmil Swaroop Pandey',
   
})
})

// app.get('',(req,res)=>{ 
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//  res.send([{
//      name: 'Andrew',
//      age: 27
//  },{
//      name:'Urmil',
//      age: 33
//  }])
// })

// app.get('/about',(req,res)=>{
//  res.send('<h1>About</h1>')
// })
app.get('/products',(req,res)=>{
    if(!req.query.search){
      return res.send({
          error:'You must provide a search term'
      })
    }
  
    
    
    //console.log(req.query.search)
    res.send({
        product:[]
    })

})




app.get('/weather',(req,res)=>{

if(!req.query.address){
    return res.send({
        error:'please enter the location'
    })
}  
  console.log(req.query.address)
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{ //destructed data Obeject 
        //console.log(data)
        if(error){
    
          return res.send ({error})
        }
    
         forecast(latitude, longitude, (error, forecastData) => { 
          //console.log(forecastData)
            if (error) {
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address:req.query.address

             
                
                
            })
            console.log(location)
          })
          
         
        })
    
})
 // console.log(req.query.address)
    

 
// app.com
//app.com/help
//app.com/about


app.get('/help/*',(req,res)=>{
    res.render('404',{           //rendering 404.hbs page
        title: '404',
        name: 'Urmil Swaroop Pandey',
        errorMsg:'Help Artical not found!!!'
     })
     })


app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Urmil Swaroop Pandey',
        errorMsg:'Page Not Found'
     })
     })

app.listen(port,()=>{
    console.log('Server is Up on port '+port)
})