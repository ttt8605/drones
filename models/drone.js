const { name } = require('ejs');
const mongoose = require('mongoose');
const { type } = require('os');
const{Schema}=mongoose;
const Project = require('./projects');
const { required } = require('joi');

const ImageSchema = new Schema({
    url:String,
    filename:String
});

ImageSchema.virtual('thumbnail').get(function(){
   return this.url.replace('/upload','/upload/w_200');
})

const droneSchema = new Schema({
name:{
    type:String,
    required:true
},
images:[ImageSchema],
size:{
    type:String,
    required:true
},
battery:{
    type:String,
    required:true
},
video:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
specification:{
    type:String,
    required:true
},
priority:{
   type:Number,
   required:true
},
projects:[
    {
    type: Schema.Types.ObjectId,
    ref:'Project'
}
]

})

const Drone = mongoose.model('Drone',droneSchema);
module.exports = Drone;