//create a middleare that name is protectRoute
//he protect the thr route
//and his use before the getUser
//fist he check the user logged in or  not 
//if loged in then it go to the getUser function

//if let flag=true //user logged in or not 

const jwt=require('jsonwebtoken');
// const jwt_key=require('secrets.js');
function protectRoute(req,res,next){
      if(req.cookies.login){
            console.log(req.cookies);
            let isVerified=jwt.verify(req.cookies.login,jwt_key);
            if(isVerified){
                  next();
            }
            else{
                  res.json({
                        message:"user not verified"
                  })
            }
           
      }
      else{
           return res.json({
                 message:'operation not allowed'
           });
      }
     }

  module.exports=protectRoute;   