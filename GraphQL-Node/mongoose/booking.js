import mongoose from 'mongoose';

var BookingSchema = new mongoose.Schema({
    id: String,
    name: String,
    available: Number,
    city:String,
    cover: String,
    startdate:String,
    endDate:String
}, {collection:"bookings"});

export default mongoose.model('Bookings', BookingSchema);