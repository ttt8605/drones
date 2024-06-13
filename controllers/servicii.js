const Service = require('../models/servicii');
const ExpressError =require('../utils/ExpressErrors');
const {cloudinary}=require("../cloudinary")


module.exports.servicesPage =  async(req,res)=>{
const services = await Service.find({})
res.render('services/main',{services})
}
 
module.exports.ServicesNewPage = async(req,res)=>{
    if(req.isAuthenticated()){
        res.render('services/new')
    }else{
        req.flash('error',"Uppps we couldn't find that page, but we think u might like this one ");
        res.redirect('/services');
    }
}

module.exports.NewServiceRequest = async(req,res)=>{
    try{
        const newService = new Service(req.body)

     newService.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
     await newService.save();
     req.flash('success','Service created');
     res.redirect('/services')
    //  res.redirect(`/projects/${newProject._id}`); // Redirect the user to the newly created project's page
    }catch(err){
        console.error(err);
        req.flash('error', 'Failed to create  service');
        res.redirect('/services/new'); // Redirect to a relevant page
    }
}