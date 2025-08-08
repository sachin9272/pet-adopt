import mongoose from "mongoose";
const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database conneted!🔌")
    } catch (error) {
        console.log("Error while connecting Db");
    }
}

export default connectDb;