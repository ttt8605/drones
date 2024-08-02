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
       if (req.files && Array.isArray(req.files)) {  
        const newService = new Service(req.body)
          newService.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
           await newService.save();
           req.flash('success','Service created');
          res.redirect('/services')
    //  res.redirect(`/projects/${newProject._id}`); // Redirect the user to the newly created project's page
    }else{
        throw new Error('No files attached to the request');
    }
    }catch(err){
        req.flash('error', 'Failed to create  service');
        res.redirect('/services/new'); // Redirect to a relevant page
    }
}


// Function to format description text
function formatDescription(text) {
    return text
      .replace(/\n/g, '<br>') // Replace newlines with <br>
      .replace(/ {2}/g, ' &nbsp;') // Replace double spaces with &nbsp;
      .replace(/ {4}/g, ' &nbsp;&nbsp;&nbsp;&nbsp;') // Replace quadruple spaces with &nbsp;&nbsp;&nbsp;&nbsp;
      .replace(/ {3}/g, ' &nbsp;&nbsp;&nbsp;'); // Replace triple spaces with &nbsp;&nbsp;&nbsp;
  }

module.exports.ServiceIndividual = async (req, res) => {
    
    const service = await Service.findById(req.params.id);
    if (!service) {
        req.flash('error', 'Cannot find that service');
        return res.redirect('/services');
    }
    res.render('services/individual', { 
        service:{
            ...service.toObject(),
            description:formatDescription(service.description)
        }
    });

};


module.exports.ServiceEditPage = async(req,res)=>{
    try{
        const{id}=req.params;
const service = await Service.findById(id);
if(req.isAuthenticated()){
        res.render('services/edit',{service})
}else{
    req.flash('error',"Uppps we couldn't find that page, but we think u might like this one ");
    res.redirect(`/services/${service._id}`);
}
}catch(error){
    req.flash('error', "Ups we couldn't find that service")
    res.redirect('/*')
}
}

module.exports.serviceEditRequest = async(req,res)=>{
    try{ const{id}=req.params;
    const service = await Service.findByIdAndUpdate(id,req.body,{runValidators: true, new: true});
    const imgs =  req.files.map(f => ({ url: f.path, filename: f.filename }))
    service.images.push(...imgs);
    await service.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
           await cloudinary.uploader.destroy(filename);
        }
       await service.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
    }
    req.flash('success','service updated');
    res.redirect(`/services/${service._id}`)
}catch(err){
    req.flash('error',err);
    res.redirect(`/services/${service._id}/edit`)
}
   
}


module.exports.serviceDeleteRequest =  async(req,res)=>{
    try {
        const { id } = req.params;

        const deletedService = await Service.findByIdAndDelete(id);
        // Check if the deleted drone has images and delete them from Cloudinary
        if (deletedService.images && Array.isArray(deletedService.images)) {
            for (let image of deletedService.images) {
                try {
                    const result = await cloudinary.uploader.destroy(image.filename);
                
                } catch (error) {
                    console.error(`Error deleting image ${image.filename}:`, error);
                }
            }
        }

        req.flash('success', 'Service deleted successfully');
        res.redirect('/services');
    } catch (error) {
        req.flash('error', 'An error occurred while deleting the Service');
        res.redirect('/services');
    }
}