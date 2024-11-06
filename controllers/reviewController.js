const {review}=require('../models')

const GetReviews=async(req,res)=>{
  try{
    const reviews=await review.find({})
    res.send(reviews)
  }catch(error){
    throw error
  }
}

const CreateReview= async (req,res)=>{
  
  try{
    const reviews= await review.create({...req.body})
    res.send(reviews)
  }catch(error){
    throw error
  }
}

const DeleteReview=async(req,res)=>{
  try{
    await review.deleteOne({_id:req.params.review_id})
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
  }

  module.exports={
    GetReviews,
    CreateReview,
    DeleteReview,
  }