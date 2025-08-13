import mongoose from "mongoose";

const favouriteSchema = mongoose.Schema({
    petId:{
        type: mongoose.Types.ObjectId,
        ref:"Pet"
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    }
});

const Favourite = mongoose.model('Favourite', favouriteSchema);

export default Favourite;