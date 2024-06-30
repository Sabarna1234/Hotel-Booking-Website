import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async(req,res,next)=>{
    const newHotel = new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)

    } catch(err){
        next(err)
    }
}



export const updateHotel = async(req,res,next)=>{

    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedHotel)

    } catch(err){
        next(err)
    }
}

 


export const deleteHotel = async(req,res,next)=>{

    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")

    } catch(err){
        next(err)
    }
}



export const getHotel = async(req,res,next)=>{

    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)

    } catch(err){
        next(err)
    }
}




export const getHotels = async (req, res, next) => {
    
    try {
      const { min, max,limit, ...others } = req.query;
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: min | 2500, $lt: max || 1000000 },
      }).limit(limit);
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  }


export const countByCity = async(req,res,next)=>{
   const cities = req.query.cities.split(",")
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city: city})
        }))
        res.status(200).json(list)

    } catch(err){
        next(err)
    }
}


export const countByType = async(req,res,next)=>{

     try{
         const hotelCount = await Hotel.countDocuments({type: "hotel"})
         const apartmentCount = await Hotel.countDocuments({type: "apartment"})
         const resortCount = await Hotel.countDocuments({type: "resort"})
         const villaCount = await Hotel.countDocuments({type: "villa"})
         const cabinCount = await Hotel.countDocuments({type: "cabin"})
         const holidayhomeCount = await Hotel.countDocuments({type: "holidayhome"})
         const homestaysCount = await Hotel.countDocuments({type: "homestays"})
         const ryokansCount = await Hotel.countDocuments({type: "ryokans"})

         res.status(200).json([
            {type: "hotel", count: hotelCount},
            {type: "apartment", count: resortCount},
            {type: "resort", count: villaCount},
            {type: "villa", count: cabinCount},
            {type: "cabin", count: holidayhomeCount}, 
            {type: "holidayhome", count: apartmentCount},
            {type: "homestays", count: homestaysCount},
            {type: "ryokans", count: ryokansCount},

         ])

     } catch(err){
         next(err)
     }
 }


export const getHotelRooms = async (req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map(room=>{
            return Room.findById(room)
        }))

        res.status(200).json(list)
    }
    catch(err){
        next(err)
    }
    
}






