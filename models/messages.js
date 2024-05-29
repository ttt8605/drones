const { name } = require('ejs');
const mongoose = require('mongoose');
const { type } = require('os');
const{Schema}=mongoose;



const ContactSchema = new Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
subject:{
    type:String,
    required:true
},
message:{
    type:String,
    required:true
}
})

const Contact = mongoose.model('Contact',ContactSchema);
module.exports = Contact;