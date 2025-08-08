import mongoose from 'mongoose';

const petSchema = mongoose.Schema({
    petName:{
        type:String,
    },
    breed:{
        type:String
    },
    age:{
        type: Number
    },
    category:{
        type:String
    },
    gender:{
        type:String
    },
    weight:{
        type:String
    },
    address:{
        type:String
    },
    about:{
        type: String
    }
},{timestamps:true});

const pet = mongoose.model('Pet', petSchema);
export default pet;