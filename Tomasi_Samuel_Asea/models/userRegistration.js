const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//create schema
const userRegistrationSchema = new mongoose.Schema({
firstName:{
    type:String,
    trim:true
},
lastName:{
    type:String,
    trim:true
},
course:{
    type:String,
    trim:true
},
entryScheme:{
    type:Number,
    trim:true
},
intake:{
    type:String, 
    
    trim:true
},
sponsorship:{
    type:String,
    trim:true
},
gender:{
    type:String,
    trim:true
},
dob:{
    type:Date,
    trim:true
},
residence:{
    type:String,
    trim:true,

},


});

//specifying details to select
userRegistrationSchema.plugin(passportLocalMongoose,{
    usernameField:"email"
})

//export module
module.exports = mongoose.model("userRegistration", userRegistrationSchema )