import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    imageUrl:{
        type:String
    },
    clerkId:{
        type: String
    },
    password:{
        type: String
    }
}, {timestamps:true});

const User = mongoose.model('User', userSchema);
export default User;