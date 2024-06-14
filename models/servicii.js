// nume , descriere , pret , youtube link , poza
const mongoose = require('mongoose');
const{Schema}=mongoose;


const ImageSchema = new Schema({
    url:String,
    filename:String
});
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
 })

const ServiciSchema = new Schema({
name:{
    type:String,
    required:true
},
price1:{
    type:Number,
    required:true
},
price2:{
    type:Number,
    required:true
},
description:{
    type:String,
    required:true
},
link:{
    type:String,
    required:true
},
images:[ImageSchema]

})

const Services = mongoose.model('Services',ServiciSchema);
module.exports = Services;