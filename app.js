const express = require('express')
const app = express()
app.listen(3000)

app.get('/', function (req, res) {
  res.sendFile('./views/index.html',{root:__dirname})
})
app.get('/about', function (req, res) {
      res.sendFile('./views/about.html',{root:__dirname})
    })

    // redirect about-us to about

    app.get('/about-us', function (req, res) {
      res.redirect('/about');
    })

    // 404 page 
    app.use((req,res)=>{
      res.status(404).sendFile('./views/404.html',{root:__dirname});

    })


    
