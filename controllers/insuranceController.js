const {insurance}=require('../models')

const GetInsurances=async(req,res)=>{
  try{
    const insurances=await insurance.find({})
    res.send(insurances)
  }catch(error){
    throw error
  }
}

const CreateInsurance= async (req,res)=>{
  
  try{
    const insurances= await insurance.create({...req.body})
    res.send(insurances)
  }catch(error){
    throw error
  }
}

const DeleteInsurance=async(req,res)=>{
  try{
    await insurance.deleteOne({_id:req.params.insurance_id})
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
  }

  module.exports={
    GetInsurances,
    CreateInsurance,
    DeleteInsurance,
  }