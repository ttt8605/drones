module.exports.isLoggedIn = (req,res,next)=>{
if(!req.isAuthenticated()){
    req.flash('error','You are not authorized');
    return res.redirect('/drones')
}
next();
}

