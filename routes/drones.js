
//setting up express
const express = require('express');
const router = express.Router();
//error handling
const catchAsync = require('../utils/catchAsync');
const ExpressError =require('../utils/ExpressErrors'); 
const{droneSchema} =  require('../schemas');
const{isLoggedIn} = require('../middleware');


const multer  = require('multer')
const {storage} = require('../cloudinary')
const modeling = require('../cloudinary')
const upload = multer({storage});


//models
const Drone = require('../models/drone');
const Project = require('../models/projects');
//controller
const droneController = require('../controllers/drones')

const sizes = ['1inch','2inch','3inch','4inch','5inch','6inch','7inch','8inch'];
const batteries =  ['1s','2s','3s','4s','5s','6s','7s','8s'];
const videos = ['Analog','Digital'];

const validateDrone = (req, res, next) => {
    const { error } = droneSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

router.route('/')
.get(droneController.dronePage )
.post(isLoggedIn, upload.array('image'),validateDrone, catchAsync(droneController.droneCreateRequest))

//add a new drone
router.get('/new', droneController.droneNewForm)
//edit a drone
router.get('/:id/edit', catchAsync(droneController.droneEditForm))

router.route('/:id')
.put( isLoggedIn, upload.array('image'),validateDrone, catchAsync(droneController.droneEditRequest))
.get( catchAsync(droneController.droneInvidualPage))
.delete( isLoggedIn,catchAsync(droneController.droneDeleteRequest))

module.exports = router;