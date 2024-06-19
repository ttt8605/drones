//require plug in s

//setting up express
const express = require('express');
const router = express.Router();
//error handling
const catchAsync = require('../utils/catchAsync');
const ExpressError =require('../utils/ExpressErrors'); 
const{ServiciiSchema} =  require('../schemas');
const{isLoggedIn} = require('../middleware');
//cloudinary
const multer  = require('multer')
const {Sstorage} = require('../cloudinary')
const modeling = require('../cloudinary')
const upload = multer({storage: Sstorage});


const servicesController =  require('../controllers/servicii')

const Services = require('../models/servicii');
const validateService= (req,res,next)=>{
    const{error} = ServiciiSchema.validate(req.body);
    if(error){
       const msg = error.details.map(el=>el.message).join(',')
       throw new ExpressError(msg, 400)
    }else{
       next();
    }
 }


 router.route('/')
 .get(servicesController.servicesPage)
.post(isLoggedIn, upload.array('image'), validateService, catchAsync(servicesController.NewServiceRequest))

router.get('/new',servicesController.ServicesNewPage)



router.route('/:id')
.get(catchAsync(servicesController.ServiceIndividual))
.put( isLoggedIn, upload.array('image'),validateService, catchAsync(servicesController.serviceEditRequest))
.delete( isLoggedIn,catchAsync(servicesController.serviceDeleteRequest))


router.route('/:id/edit')
.get(catchAsync(servicesController.ServiceEditPage))



 module.exports = router;