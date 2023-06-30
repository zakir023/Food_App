const express = require('express');
const app = express();
const cookiesParser=require('cookie-parser');



//middleware function post,front->json
app.use(express.json());
app.listen(3000);
app.use(cookiesParser()); //cookieparser ko invoke kardiya 

// let users = [
//       {
//             'id': 1,
//             'name': 'Abhishek'
//       },
//       {
//             'id': 2,
//             'name': 'Jasbir'
//       },
//       {
//             'id': 3,
//             'name': 'Kartik'
//       }
// ];

//now we create a mini app 
//mini app
const userRouter = require('./foodApp/Routers/userRouter.js');
const authRouter=require('./foodApp/Routers/authRouter.js');
//base router,router to use
app.use('/user', userRouter);
app.use('/auth',authRouter);






