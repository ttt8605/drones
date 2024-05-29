//require plug in s

//setting up express
const express = require('express');
const router = express.Router();
//error handling
const catchAsync = require('../utils/catchAsync');
const ExpressError =require('../utils/ExpressErrors'); 
const{projectSchema} =  require('../schemas');
const{isLoggedIn} = require('../middleware');
//cloudinary
const multer  = require('multer')
const {Pstorage} = require('../cloudinary')
const modeling = require('../cloudinary')
const upload = multer({storage: Pstorage});



//controllers
const projectController = require('../controllers/projects')
//require models

const Project = require('../models/projects');
const Drone = require('../models/drone');
const validateProject= (req,res,next)=>{
    const{error} = projectSchema.validate(req.body);
    if(error){
       const msg = error.details.map(el=>el.message).join(',')
       throw new ExpressError(msg, 400)
    }else{
       next();
    }
 }

router.route('/')
.get(projectController.projectPublicPage)
.post(isLoggedIn, upload.array('image'), validateProject, catchAsync(projectController.projectNewRequest))


router.get('/new', projectController.projectCreateForm)


router.route('/:id')
.get( catchAsync(projectController.projectInvidualPublicPage))
.put( isLoggedIn,upload.array('image'), validateProject, catchAsync(projectController.projectEditRequest))
.delete(isLoggedIn,catchAsync(projectController.projectDeleteRequest))


router.get('/:id/edit',catchAsync(projectController.projectEditForm))

module.exports = router;