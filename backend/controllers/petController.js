import Pet from "../models/petModel.js";

export const AddPet = async(req, res) => {
    console.log("API hitted::::====>")
    // const userId = req?.user?.userId;
    console.log('Bodyyy-->', req.body);
    const userId = '68a213abf1abebf8f53bab35';
    const {name, breed, age, category, gender, address, about} = req.body; // Add weight
    // try {
        if(!name || !breed || !age || !category || !gender || !address || !about){
            return res.status(400).json({message:"Please provide all details."});
        }
        const pet = await Pet.create({
            petName: name,
            breed, 
            age, 
            category, 
            gender, 
            // weight, 
            address, 
            about,
            user:userId
        });
        return res.status(201).json({message:"Pet added successfully", pet, success: true})
    // } catch (error) {
    //     return res.status(500).json({message:"Internal Server Error", success: false});
    // }
}

const DeletePet = async(req, res) => {
    const {petId} = req.params;
    const deletedPet = await Pet.findByIdAndDelete(petId);
    
}