const {vehicle}=require('../models')

const GetVehicles=async(req,res)=>{
  try{
    const vehicles=await vehicle.find({})
    res.send(vehicles)
  }catch(error){
    throw error
  }
}

const CreateVehicle= async (req,res)=>{
  
  try{
    const vehicles= await vehicle.create({...req.body})
    res.send(vehicles)
  }catch(error){
    throw error
  }
}

const DeleteVehicle=async(req,res)=>{
  try{
    await vehicle.deleteOne({_id:req.params.vehicle_id})
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
  }

  module.exports={
    GetVehicles,
    CreateVehicle,
    DeleteVehicle,
  }