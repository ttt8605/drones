const Project = require('../models/projects');
const Drone = require('../models/drone');
const ExpressError =require('../utils/ExpressErrors');
const {cloudinary}=require("../cloudinary")


module.exports.projectCreateForm =async(req,res)=>{

    if(req.isAuthenticated()){
        const drones = await Drone.find({});
        res.render('projects/new',{drones})
    }else{
        req.flash('error',"Uppps we couldn't find that page, but we think u might like this one ");
        res.redirect('/projects');
    }
}


module.exports.projectNewRequest =  async(req,res)=>{
    try {
        // Check if req.files is defined and is an array
        if (req.files && Array.isArray(req.files)) {
             const newProject = new Project(req.body)
               for (const droneId of newProject.drones) {
              const drone = await Drone.findById(droneId);
              drone.projects.push(newProject._id);
               await drone.save();
        }
            newProject.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
            await newProject.save();
            req.flash('success','Project created');
            res.redirect(`/projects/${newProject._id}`); // Redirect the user to the newly created project's page
        } else {
            throw new Error('No files attached to the request');
        }
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to create  project');
        res.redirect('/projects'); // Redirect to a relevant page
    }

}

module.exports.projectPublicPage = async(req,res)=>{
    const projects = await Project.find({});
    res.render('projects/projectsPage',{projects});
}


module.exports.projectInvidualPublicPage = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id).populate('drones');
        if (!project) {
            req.flash('error', "Oops, we couldn't find that project");
            return res.redirect('/projects');
        }
        res.render('projects/show', { project });
    } catch (error) {
        next(new ExpressError('Project Not Found', 404));
    }
};

module.exports.projectEditForm =  async(req,res,next)=>{
    try{
         const { id }=req.params;
    const project = await Project.findById(id);
    const drones = await Drone.find({})
    
    if(req.isAuthenticated()){
        if(!project){
            req.flash('error',"Ups we couldn't find that project");
            return res.redirect('/projects')
        }else{
            res.render('projects/edit',{project,drones});
        }
    }else{
        req.flash('error',"Uppps we couldn't find that page, but we think u might like this one ");
        res.redirect(`/projects/${project._id}`);
    }
    }catch(error){
        next(new ExpressError('Project Not Found', 404));
    }
   
   
}

module.exports.projectEditRequest = async (req, res) => {
    const projectId = req.params.id;
    const updatedProjectData = req.body;

    try {
            // Get the original project
            const originalProject = await Project.findById(projectId);
        // Update the project
        const updatedProject = await Project.findByIdAndUpdate(projectId, updatedProjectData, {runValidators: true, new: true });
        const imgs =  req.files.map(f => ({ url: f.path, filename: f.filename }))
        updatedProject.images.push(...imgs);
        await updatedProject.save();
        if(req.body.deleteImages){
            for(let filename of req.body.deleteImages){
               await cloudinary.uploader.destroy(filename);
            }
           await updatedProject.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
           
        }
    
        // Update associated drones
        for (const droneId of updatedProject.drones) {
            // If the drone was already associated with the project, skip updating
            if (!originalProject.drones.includes(droneId)) {
                const drone = await Drone.findById(droneId);
                if (drone) {
                    drone.projects.push(updatedProject._id);
                    await drone.save();
                }
            }
        }

        // Remove disassociated drones
        for (const droneId of originalProject.drones) {
            // If the drone is no longer associated with the project, remove association
            if (!updatedProject.drones.includes(droneId)) {
                const drone = await Drone.findById(droneId);
                if (drone) {
                    drone.projects = drone.projects.filter(project => project.toString() !== updatedProject._id.toString());
                    await drone.save();
                }
            }
        }

        req.flash('success', 'Project edited');
        res.redirect(`/projects/${updatedProject._id}`);
    } catch (error) {
        req.flash('error', 'Error editing project');
        console.error('Error editing project:', error);
        res.redirect('/projects');
    }
}

module.exports.projectDeleteRequest =  async(req,res)=>{
    const{id}=req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (deletedProject.images && Array.isArray(deletedProject.images)) {
        for (let image of deletedProject.images) {
            try {
                const result = await cloudinary.uploader.destroy(image.filename);
   
            } catch (error) {
                console.error(`Error deleting image ${image.filename}:`, error);
            }
        }
    }
    req.flash('success','Project deleted');
    res.redirect('/projects')
}
