import mongoose from 'mongoose';

var HotelSchema = new mongoose.Schema({
        id: Number,
        name: String,
        available: Number,
        city:String,
        cover: String
}, {collection:"hotels"});

var Hotel = mongoose.model('Hotel', HotelSchema);
export default Hotel
