import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
// import { verifyToken } from "@clerk/clerk-sdk-node";

// export const generateBackendToken = async (req, res) => {
// //   try {
//     const clerkToken = req.headers.authorization?.replace("Bearer ", "");
//     console.log("ClerkToken--->", clerkToken);
//     if (!clerkToken) {
//       return res.status(401).json({ message: "No Clerk token provided" });
//     }

//     const sessionClaims = await verifyToken(clerkToken, {
//       secretKey: process.env.CLERK_SECRET_KEY,
//     });
//     console.log("SessionClaims---->", sessionClaims);

//     // const sessionClaims = await verifyToken(clerkToken);
//     // console.log("Session--->>...Calamins---->=>", sessionClaims);
//     const { email, first_name, last_name, profile_image_url } = sessionClaims;
//     let user = await User.findOne({ clerkId });
//     if (!user) {
//       user = await User.create({
//         clerkId,
//         email,
//         firstName: first_name || "",
//         lastName: last_name || "",
//         profileImage: profile_image_url || "",
//       });
//     }

//     // ✅ Create your own JWT
//     const myJwt = jwt.sign(
//       { userId: user._id, clerkId: user.clerkId, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ token: myJwt, user });
// //   } catch (err) {
// //     console.error("Auth error:", err.message);
// //     res.status(401).json({ message: "Invalid Clerk token" });
// //   }
// };


import { verifyToken, clerkClient } from "@clerk/clerk-sdk-node";

export const generateBackendToken = async (req, res) => {
  try {
    const clerkToken = req.headers.authorization?.replace("Bearer ", "");
    if (!clerkToken) {
      return res.status(401).json({ error: "No token provided" });
    }

    // ✅ Verify Clerk session token
    const sessionClaims = await verifyToken(clerkToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    console.log("session claims---->", sessionClaims);

    // ✅ Fetch Clerk user
    const clerkUser = await clerkClient.users.getUser(sessionClaims.sub);

    console.log("Clerk User----->", clerkUser);

    // ✅ Find or create user in MongoDB
    let dbUser = await User.findOne({ clerkId: clerkUser.id });
    if (!dbUser) {
      dbUser = await User.create({
        clerkId: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress,
        name: clerkUser.fullName,
        imageUrl: clerkUser.imageUrl,
      });
    }

    // ✅ Issue your own JWT
    const myJwt = jwt.sign({ userId: dbUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token: myJwt, user: dbUser });
  } catch (err) {
    console.error("Exchange error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};



export const GetAllFavoritePets = async(req, res) => {
    // const 
}

export const AddToFavorite = async(req, res) => {
    const petId = req

}

export const RemoveFromFavourite = async(req, res) => {

}