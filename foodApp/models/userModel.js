//connect the mongoDB
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');

const db_link='mongodb+srv://admin:2pytltT2ULrikUPI@cluster0.8y95718.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
      // console.log(db);
      console.log("db connected");
      
}).catch(function(err){
      console.log(err);
})

//creat a Schema

const usereSchema=mongoose.Schema({
      name:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true,
            unique:true,
            validatore:function(){
                  return emailValidator.validate(this.email);
            }
      },
      password:{
            type:String,
            required:true,
            minLength:8
      },
      confirmPassword:{
            type:String,
            required:true,
            minLength:8,
            validatore:function(){
                  return this.confirmPassword=this.password;
            }
      }
});

//pre post hooks
// before saving details in database
// usereSchema.pre('save',function(){
//       console.log("before saving in db",this);
// });
// //affter saving the details  in database
// usereSchema.post('save',function(doc){
//       console.log("after saving in db",doc);
// });

//pre hooks ka use kiye 
// Q ki humko data ko save hone se pahle
//confirm password ko undefine ho jaye

usereSchema.pre('save',function(){
      this.confirmPassword=undefined;
})
//yaha pe hash aur bcrypt ka user karke 
//password ko secure karrahe hain hackers se
// usereSchema.pre('save',async function(){
//       let salt= await bcrypt.genSalt();
//       let hashedString=await bcrypt.hash(this.password,salt);
//       // console.log(hashedString);
//       this.password=hashedString;
// })

// create model 
//and in the model we are passing two argument
const userModel=mongoose.model('userModel',usereSchema);
module.exports=userModel;

// now create a user 

// (async function createUser(){
//       let user={
//             name:'zakir',
//             email:'zakir023@gmail.com',
//             password:'123456789',
//             confirmPassword:'123456789'
//       };
//       let data=await userModel.create(user);
//       console.log(data);
// })();

