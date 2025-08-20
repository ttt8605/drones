// const Contact = require('../models/messages')
   const Review = require('../models/review')

   module.exports.reviewPublicPage = (req,res)=>{
    res.render('review/new')
   }

module.exports.reviewAddRequest =  async(req,res,next)=>{
    const newReview = new Review(req.body);
    await newReview.save();
    req.flash('success','Message sent');
    res.redirect('/projects');
}

module.exports.ReviewAdminPage = async(req,res)=>{
    if(req.isAuthenticated()){
        const review= await Review.find({});
        res.render('review/all',{review})
    }else{
        req.flash('error',"Uppps we couldn't find that page, but we think u might like this one ");
        res.redirect('/review');
    }
       
}

module.exports.reviewDeleteRequest =  async(req,res)=>{
    const{id}=req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    req.flash('success','Review deleted');
    res.redirect('/review/all')
}