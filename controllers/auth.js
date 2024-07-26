const User = require('../models/user');


module.exports.userCreateForm = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('auth/register');
    }else{
        req.flash('error',"Uppps we couldn't find that page, but we think u might like this one ");
        res.redirect('/projects');
    }
    
}

module.exports.userCreateRequest =  async(req,res)=>{
    try{
        const{email,username,password} = req.body;
        const user = new User({email,username});
       const registerUser = await User.register(user,password);
       req.flash('success','Account created');
      res.redirect('/drones')
     
    }catch(e){
        req.flash('error', e.message);
        res.redirect('register')
    }
}

module.exports.userLoginForm = (req,res)=>{
    res.render('auth/login')
}

module.exports.userLoginRequest =(req,res)=>{
    req.flash('success','welcome back');
    res.redirect('/drones');
}

module.exports.userLogoutRequest = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/drones');
    });
}