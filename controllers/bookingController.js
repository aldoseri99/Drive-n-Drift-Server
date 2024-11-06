const {booking}=require('../models')

const GetBookings=async(req,res)=>{
  try{
    const bookings=await booking.find({})
    res.send(bookings)
  }catch(error){
    throw error
  }
}

const CreateBooking= async (req,res)=>{
  
  try{
    const bookings= await booking.create({...req.body})
    res.send(bookings)
  }catch(error){
    throw error
  }
}

const DeleteBooking=async(req,res)=>{
  try{
    await booking.deleteOne({_id:req.params.booking_id})
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
  }

  module.exports={
    GetBookings,
    CreateBooking,
    DeleteBooking,
  }