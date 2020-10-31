//nodemon src/app.js -e js,hbs to run the program

//To install express-npm i express@4.16.4
//To install hbs-npm i hbs@4.0.1
const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const port =process.env.PORT || 3000
// console.log(__dirname);   Directory address
// console.log(__filename);  File address
//console.log(path.join(__dirname,'../public'));  directory address of index.html

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')   //customized path
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)   //customised view
hbs.registerPartials(partialPath)
//https://expressjs.com/en/4x/api.html#app.set


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
  res.render('index',{
    title:'Weather',
    name:'Komal Kolambe , Rahul Adam , Pranjali Mane'
  })
})

app.get('/about',(req,res) => {
  res.render('about',{
    title:'About Us',
    name:'Komal Kolambe , Rahul Adam , Pranjali Mane'
  })
})

app.get('/help',(req,res) => {
  res.render('help',{
    title:'Help',
    help:'Please go to weather page to enter a valid location',
    name:'Komal Kolambe , Rahul Adam , Pranjali Mane'
  })
})

app.get('/weather',(req,res) =>{
  if(!req.query.address){
    return res.send({
      error:'You must provide an address'
    })
  }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) =>{
      if(error){
        return res.send({ error })
      }

      //Weather Function calling
      weather(latitude,longitude,(error,weatherdata) =>{
        if(error){
          return res.send({  error  })
        }

        res.send({
          place:location,
          weather: weatherdata
        })

      })
    })

  // res.send({
  //   place:req.query.address,
  //   latitude:1,
  //   longitude:2
  // })
})

app.get('/products',(req,res) => {  //can only send once response
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }
  res.send({
    products:[]
  })
})


app.get('/help/*', (req,res) => {
  res.render('help1',{
    title:'Help',
    helptext:'Help article not found'
  })
})

//404
app.get('*',(req,res) => {
  res.render('404',{
    title:'Help',
    helptext:'Page not found'
  })
})


// app.get('',(req , res) => {
//   res.send('<h1>Hello express!</h1>')
// })    Same as line-10 & 12

// app.get('/help',(req,res) =>{
//   res.send([{
//     name:'Yash',
//     age:27
//   },{
//     name:'Gau'
//   }])
// })
//
// app.get('/about',(req,res) =>{
//   res.send('<title>About</title>')
// })



app.listen(port , () => {               //port name
  console.log('Server is up!');
})
