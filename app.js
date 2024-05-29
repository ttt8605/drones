
if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
 }
 

//require plug in s
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session')
const flash = require('connect-flash')
const User = require('./models/user')
//setting up express
const express = require('express');
const app = express();
const catchAsync = require('./utils/catchAsync');
const ExpressError =require('./utils/ExpressErrors');
const path = require('path');
const methodOverride = require('method-override')
//setting up mongoose/mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Drones')
.then(()=>{
    console.log(" Mongo connection open")
})
.catch(err =>{
    console.log("oh no mongo  error")
console.log(err)
});
//ejs mate
const ejsMate = require('ejs-mate');


//setting up stylesheets
app.use(express.static('public'))

// conectam ejs ul 
app.engine('ejs',ejsMate)
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// it parses incoming requests with URL-encoded payloads and is based on a body parser
app.use(express.urlencoded({extended: true}))
//helps with updating info from a database from a form
app.use(methodOverride('_method'));

//routes
const dronesRoutes = require('./routes/drones')
const projectsRoutes = require('./routes/projects')
const contactRoutes = require('./routes/contact')
const userRoutes = require('./routes/auth');


//session set up
const sessionConfig = {
    secret:'thisshouldbeabettersecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
       httpOnly:true,
       expires:Date.now()+1000*60*60*24*7,
       maxAge:1000*60*60*24*7
       
    }
 }
 app.use(session(sessionConfig))
 
 //flash middleware
 app.use(flash());

 
 //authentification
 app.use(passport.initialize());
 app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    
    next();
 })


//routes pages
app.use('/drones', dronesRoutes);
app.use('/projects', projectsRoutes);
app.use('/contact',contactRoutes);
app.use('/', userRoutes)

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404));
})

app.use((err,req,res,next)=>{
    const{statusCode = 500}=err;
    if(!err.message) err.message = 'Oh no , Something went Wrong'
    res.status(statusCode).render('error',{err});

}) 

app.listen(3000,()=>{
    console.log('listening on port 3000')
})