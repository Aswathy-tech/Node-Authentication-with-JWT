const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const path = require('path'); 
const { requireAuth, checkUser } = require('./middleware/authMiddleware');



const app = express();


// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// database connection

const dbURI = 'mongodb+srv://ash:ash@jwt.goakert.mongodb.net/test'; 

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));
app.use(authRoutes);

//cookies

//app.get('/set-cookies',(req,res)=>{
//  res.cookie('newUser',false);
//  res.cookie('isEmployee',true,{maxAge:1000*60*60*24,httpOnly:true})
//  res.send('you got the cookies');
//});
//app.get('/read-cookies',(req,res)=>{
//
//  const cookies =req.cookies;
//  console.log(cookies);
//  res.json(cookies);
//
//});
module.exports = app;
