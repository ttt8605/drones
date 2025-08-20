const { name } = require('ejs');
const mongoose = require('mongoose');
const { type } = require('os');
const{Schema}=mongoose;



const ReviewSchema = new Schema({
name:{
    type:String,
    required:true
},

message:{
    type:String,
    required:true
},
starRating:{
    type:Number,
    required:true,
    min:1,
    max:5
}
},{timestamps:true});

const Review = mongoose.model('Review',ReviewSchema);
module.exports = Review ;