//dependencies
const express = require("express");// for posting
const mongoose = require("mongoose");//for mongodb
var postman = require("postman");
const path = require("path");
const passport = require('passport');
const expressSession = require('express-session')({
 secret:"secret",
 resave:false,
 saveUninitialized:false
});


require("dotenv").config();

//import register model with user details
const userRegistration = require("./models/userRegistration")


const port = 3000;

//importing routes
const registrationRoutes = require("./routes/registrationRoutes")


//instantiation
const app = express();


//configurations
mongoose.connect(process.env.DATABASE,{
 useNewUrlParser: true,
  useUnifiedTopology: true,
});

 mongoose.connection
.once("open", () => {
 console.log("Mongoose connection open");
})
.on("error", err => {
 console.error(`Connection error: ${err.message}`);
});

app.set('view engine', 'pug');// setting view engine pug
app.set("views", path.join(__dirname, "views"));// specify the directory where the views are found

//middleware
app.use(express.static(path.join(__dirname, "public")));//set directory for static files
app.use(express.urlencoded({extended:true}));
app.use(express.json());// to return data in the response path

//express session configuration
 app.use(expressSession);
 app.use(passport.initialize());
 app.use(passport.session());

//passport configurations
 passport.use(userRegistration.createStrategy());// calling passport to create strategy for authenticating users
 passport.serializeUser(userRegistration.serializeUser());// track user usage by assigning unique number
 passport.deserializeUser(userRegistration.deserializeUser());// break system upon logout
 

//use imoported routes
app.use("/", registrationRoutes);


//routes
// app.get("/adduser", (req,res)=>{
//   res.render("addUser")
//   });
  
//   app.get("/admindash", (req,res)=>{
//   res.render("admindash")
//   });

//routes first
//app.get('/', (req, res) => {
//  res.send('Homepage! Hello world.');
//});

// app.get('/about', (req, res) => { // new
//   res.send('About page. Nice.');
// });


//app.get('/books/bookId', (req, res) => { // new
// res.send(req.paramas.bookId);
// console.log(req.params.bookId);
// });

// app.get('/students/studentsId', (req, res) => { // new
//   res.send('xx' + req.params.studentId);
// });

// //queryparams
// app.get('/students', (req, res) => { // new
//   res.send('this is class' + req.query.class + "cohort" + req.query.cohort);
// });

// app.get('/users', (req, res) => { // new
//   res.send('this is' + req.query.name + "userName" + req.query.userName);
// });

//serving html files

//app.get('/index', (req, res) => { // new
//  res.sendFile(__dirname + '/index.html');
//});






//invalid 
app.get('*', (req, res) => { // new
  res.send('404! invalid url.');
});

//always last
app.listen(port, () => console.log`listening on port ${port}`);