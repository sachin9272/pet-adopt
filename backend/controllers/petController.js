import Pet from "../models/petModel.js";

export const AddPet = async(req, res) => {
    const userId = req?.user?.userId;
    const {petName, breed, age, category, gender, weight, address, about} = req.body;
    try {
        if(!petName || !breed || !age || !category || !weight || !gender || !address || !about){
            return res.status(400).json({message:"Please provide all details."});
        }
        const pet = await Pet.create({
            petName,
            breed, 
            age, 
            category, 
            gender, 
            weight, 
            address, 
            about,
            user:userId
        });
        return res.status(201).json({message:"Pet added successfully", success: true})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error", success: false});
    }
}