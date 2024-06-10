const Drone = require('../models/drone');
const Project = require('../models/projects');

const sizes = ['1inch','2inch','3inch','4inch','5inch','6inch','7inch','8inch','9inch'];
const batteries =  ['1s','2s','3s','4s','5s','6s','7s','8s'];
const videos = ['Analog','Digital'];
const {cloudinary}=require("../cloudinary")

module.exports.dronePage =async(req,res)=>{
    const drones = await Drone.find({});
    res.render('drones/dronepage',{drones})
}


module.exports.droneNewForm = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('drones/new',{sizes,batteries,videos})
    }else{
        req.flash('error',"Uppps we couldn't find that page, but we think u might like this one ");
        res.redirect('/drones');
    }
       
  
}



module.exports.droneCreateRequest = async (req, res, next) => {
    try {
        // Check if req.files is defined and is an array
        if (req.files && Array.isArray(req.files)) {
            const newDrone = new Drone(req.body);
            newDrone.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
            await newDrone.save();
            req.flash('success', 'Drone created');
            res.redirect(`/drones/${newDrone._id}`);
        } else {
            throw new Error('No files attached to the request');
        }
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to create drone');
        res.redirect('/drones'); // Redirect to a relevant page
    }
}

module.exports.droneEditForm = async(req,res)=>{
    try{
            const{id}=req.params;
    const drone = await Drone.findById(id);
    if(req.isAuthenticated()){
        if(!drone){
            req.flash('error',"Ups we couldn't find that drone");
            return res.redirect('/drones')
        }else{
            res.render('drones/edit',{drone,sizes,videos,batteries})
        }
    }else{
        req.flash('error',"Uppps we couldn't find that page, but we think u might like this one ");
        res.redirect(`/drones/${drone._id}`);
    }
    }catch(error){
        req.flash('error', "Ups we couldn't find that drone")
        res.redirect('/*')
    }

}

module.exports.droneEditRequest = async(req,res)=>{
    
    const{id}=req.params;
    const drone = await Drone.findByIdAndUpdate(id,req.body,{runValidators: true, new: true});
    const imgs =  req.files.map(f => ({ url: f.path, filename: f.filename }))
    drone.images.push(...imgs);
    await drone.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
           await cloudinary.uploader.destroy(filename);
        }
       await drone.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
       
    }
    req.flash('success','drone updated');
    res.redirect(`/drones/${drone._id}`)
}


module.exports.droneInvidualPage =  async(req,res)=>{
    try{
          const drone = await Drone.findById(req.params.id).populate('projects');
    if(!drone){
        req.flash('error',"Ups we couldn't find that drone");
        return res.redirect('/drones')
    }else{
        res.render('drones/showdrone',{drone})
    }
    }catch(error){
        req.flash('error', "Ups we couldn't find that drone")
        res.redirect('/*')
    }
  
}

module.exports.droneDeleteRequest =  async(req,res)=>{
    try {
        const { id } = req.params;

        const deletedDrone = await Drone.findByIdAndDelete(id);
        // Check if the deleted drone has images and delete them from Cloudinary
        if (deletedDrone.images && Array.isArray(deletedDrone.images)) {
            for (let image of deletedDrone.images) {
                try {
                    const result = await cloudinary.uploader.destroy(image.filename);
                
                } catch (error) {
                    console.error(`Error deleting image ${image.filename}:`, error);
                }
            }
        }

        req.flash('success', 'Drone deleted successfully');
        res.redirect('/drones');
    } catch (error) {
        console.error('Error during drone deletion:', error);
        req.flash('error', 'An error occurred while deleting the drone');
        res.redirect('/drones');
    }
}