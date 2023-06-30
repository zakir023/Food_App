const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel.js');
const cookiesParser = require('cookie-parser');
const jwt=require('jsonwebtoken');
//  const jwt_key=require('secrets.js');


authRouter
      .route('/signup')
      .get(middleware1, getSignUp, middleware2)
      .post(postSignUp)

authRouter
      .route('/login')
      .post(loginUser)

// app.get('/user');
// app.post('/user');
// //update ->patch
// app.patch('/user');
// //delete a data
// app.delete('/user');

//params 
// app.get('/user/:id');

function middleware1(req, res, next) {
      console.log("middleware1 encounter");
      next();
}
function middleware2(req, res) {
      console.log("middleware2 encounter");
      // next();
      // res.json({message:"middleware 2 ended req/re cycle"});
      console.log("middleware 2 ended req/re cycle");
      res.sendFile('./foodApp /public/index.html', { root: __dirname });
}

function getSignUp(req, res, next) {

      console.log("getSignUp called ");
      next();
      // res.sendFile('/public/index.html',{root:__dirname});
}
async function postSignUp(req, res) {
      let dataObj = req.body;
      let user = await userModel.create(dataObj);
      //     console.log('backend',user);
      res.json({
            message: "user signed up",
            data: user
      });
}

// create a login function 

async function loginUser(req, res) {
      try {
            let data = req.body;
            if (data.email) {
                  let user = await userModel.findOne({ email: data.email });
                  if (user) {

                        if (user.password == data.password) {
                              

                              let uid=user['_id']; // user ki id hai ye 
                              let token=jwt.sign({payload:uid},jwt_key);
                              res.cookie('login',token,{httpOnly:true});
                              return res.json({
                                    message: "user has logged in ",
                                    userDetails: data
                              });
                        }
                        else {
                              return res.json({
                                    message: "wrong credential"
                              })
                        }
                  }
                  else {
                        return res.json({
                              message: "user not found"
                        })
                  }
            }

            else {
                  return res.json({
                        message: "empty field found"
                  })
            }
      }

      catch (err) {
            return res.status(500).json({
                  message: err.message
            })
      }
}

module.exports = authRouter;

