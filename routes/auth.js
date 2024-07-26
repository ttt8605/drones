const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const{isLoggedIn} = require('../middleware');
const userControler = require('../controllers/auth')

router.route('/register')
.get(userControler.userCreateForm)
.post(isLoggedIn,catchAsync(userControler.userCreateRequest));

router.route('/login')
.get(userControler.userLoginForm)
.post(passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}),userControler.userLoginRequest)


router.get('/logout', userControler.userLogoutRequest); 

module.exports = router;
