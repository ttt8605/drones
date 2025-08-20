//require plug in s

//setting up express
const express = require('express');
const router = express.Router();
//error handling
const catchAsync = require('../utils/catchAsync');
const ExpressError =require('../utils/ExpressErrors'); 
const{ReviewSchema} =  require('../schemas')
const{isLoggedIn} = require('../middleware');

const validateReview = (req, res, next) => {
    const { error } = ReviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash('error', msg); // Set the flash message
        return res.redirect('/review'); // Redirect with the flash message
    } else {
        next();
    }
};
//models
const Review = require('../models/review')
//controlers
const reviewController = require('../controllers/reviewController');

//add a new message

router.route('/')
.get(reviewController.reviewPublicPage)
.post(validateReview, catchAsync(reviewController.reviewAddRequest))

router.get('/all',catchAsync(reviewController.ReviewAdminPage))
router.delete('/:id', isLoggedIn,catchAsync(reviewController.reviewDeleteRequest))

module.exports = router;