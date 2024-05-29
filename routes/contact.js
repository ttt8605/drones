//require plug in s

//setting up express
const express = require('express');
const router = express.Router();
//error handling
const catchAsync = require('../utils/catchAsync');
const ExpressError =require('../utils/ExpressErrors'); 
const{ContactSchema} =  require('../schemas')
const{isLoggedIn} = require('../middleware');

const validateContact = (req, res, next) => {
    const { error } = ContactSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};
//models
const Contact = require('../models/messages')
//controlers
const contactController = require('../controllers/contact');

//add a new message

router.route('/')
.get(contactController.contactPublicPage)
.post(validateContact, catchAsync(contactController.contactAddRequest))

router.get('/all',contactController.contactAdminPage)
router.delete('/:id', isLoggedIn,catchAsync(contactController.contactDeleteRequest))

module.exports = router;