const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel.js');
const protectRoute = require('./authHelper.js');

userRouter
      .route('/')
      .get(protectRoute, getUsers)
      .post(postUser)
      .patch(updateUser)
      .delete(deleteUser)

userRouter
      .route('/getCookies')
      .get(getCookies);


userRouter
      .route('/setCookies')
      .get(setCookies);

userRouter
      .route('/:id')
      .get(getUserById)

async function getUsers(req, res) {
      // console.log(req.query);
      // let allUsers=await userModel.find();
      let allUsers = await userModel.findOne({ name: "zakir" });
      res.json({
            message: "list of all users",
            data: allUsers
      })

};

function postUser(req, res) {
      console.log(req.body);
      users: req.body;
      res.json({
            message: "data received succesfully",
            user: req.body
      });
};

async function updateUser(req, res) {
      console.log('req.body->', req.body);
      //update data in users object
      let dataToBeUpdated = req.body;
      let user = await userModel.findOneAndUpdate({ email: "abc@gmail.com" }, dataToBeUpdated);
      // for (key in dataToBeUpdated) {
      //       users[key] = dataToBeUpdated[key];
      // }
      res.json({
            message: "data updated successfully",
            data: user
      })
};

async function deleteUser(req, res) {
      let dataToBeUpdated = req.body;
      let user = await userModel.findOneAndDelete(dataToBeUpdated);

      // users = {};
      res.json({
            message: "data to be deleted",
            data: user
      })
};


function setCookies(req, res) {
      // res.setHeader('Set-Cookie','isLoggedIn=true');
      res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });
      res.cookie('isLoggedIn', true); //this is not secure acces by the browser
      res.send("cookies has been set");
}

function getCookies(req, res) {
      let cookies = req.cookies.isLoggedIn; //jis ttrah ki req.body same as
      console.log(cookies);
      res.send('cookies recived');
}

function getUserById(req, res) {
      console.log(req.params.id);
      // console.log(req.params);
      // res.send("user id recived");

      let paramId = req.params.id;
      let obj = {};
      for (let i = 0; i < users.length; i++) {
            if (users[i]['id'] == paramId) {
                  obj = users[i];
            }
      }
      res.json({
            message: "req received",
            data: obj
      });
};



module.exports = userRouter;