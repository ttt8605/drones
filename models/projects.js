const mongoose =  require('mongoose');
const Drone = require('./drone');
const { link } = require('joi');
const{Schema}=mongoose;

const ImageSchema = new Schema({
    url:String,
    filename:String
});
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
 })
 

const projectsSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:[ImageSchema],
    link:{
        type:String,
        required:true
    },
    drones:[
        {
            type: Schema.Types.ObjectId,
            ref:'Drone'
        }
    ]
   


});



const Project = mongoose.model('Project',projectsSchema);
module.exports = Project;