//server creation 
// 1. http module

const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const server = http.createServer((req, res) => {
      console.log("request has been made from server to browser");
      // console.log(req.method);
      // console.log(req.url);

      res.setHeader('Content-Type', 'text/html');
      // res.write('<h1> hello,pepcode ! </h1>');
      // res.write('<h2> how do in !</h2>');
      // res.end();

      /* lodash */
      let num=_.random(0,20)
      console.log(num);

      let greet=_.once(()=>{
            console.log('hello');
      })
      greet();
      greet();


      let path = './views';
      switch (req.url) {
            case '/':
                  path += '/index.html';
                  res.statusCode=200;
                  break;
            case '/about':
                  path += '/about.html'
                  res.statusCode=200;
                  break;
            
            case '/about_abc':
                  res.statusCode=301; //jab aap kisi file ko permanently move karte hain uska code 301 hota hai
                  res.setHeader('location','/about');
            
                  res.end();
                  break;
            default:
                  path += '/404.html'
                  res.statusCode=404;
                  break;

      };

      /* now mai chaheta hu file ko read ,render karamna*/
      // fs.readFile('./views/index.html',(err,filedata)=>{
      fs.readFile(path, (err, filedata) => {
            if (err) {
                  console.log(err);
            }
            else {
                  // res.write(filedata);
                  res.end(filedata);
            }
      })


});
//server ka face ban gya hai ab server ka kaan banyaenge 
//jisse ki server sun sake 
// use ke liye hum use karenge listen(port,host,callback
//server ke pass host  se hi request ati hai 
//aur ye port 3000 pe sune ga 

server.listen(3000, 'localhost', () => {
      console.log("server is listening on port 3000");
})
