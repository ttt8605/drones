const Contact = require('../models/messages')

module.exports.contactPublicPage = (req,res)=>{
    res.render('contact/new')
}

module.exports.contactAddRequest =  async(req,res,next)=>{
    const newContact = new Contact(req.body);
    await newContact.save();
    req.flash('success','Message sent');
    res.redirect('/contact');
}

module.exports.contactAdminPage = async(req,res)=>{
    if(req.isAuthenticated()){
        const contact= await Contact.find({});
        res.render('contact/all',{contact})
    }else{
        req.flash('error',"Uppps we couldn't find that page, but we think u might like this one ");
        res.redirect('/contact');
    }
       
}

module.exports.contactDeleteRequest =  async(req,res)=>{
    const{id}=req.params;
    const deletedMessage = await Contact.findByIdAndDelete(id);
    req.flash('success','Message deleted');
    res.redirect('/contact')
}