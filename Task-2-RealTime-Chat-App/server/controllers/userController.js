import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'


// signup a new user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.json({ success: false, message: "Account Already exists" })
        }

        const salt = await bcrypt.genSalt(10);

        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, password: hashedpassword, bio
        });

        const token = generateToken(newUser._id)

        res.json({ success: true, userDate: newUser, token, message: "Account created Successfully" })

    } catch (error) {
        console.log(error.message);

        res.json({ success: false, message: error.message })
    }
}


// Login a user

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userDate = await User.findOne({ email })

        const isPasswordCorrect = await bcrypt.compare(password, userDate.password)

        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invaild credentials" })
        }

        const token = generateToken(userDate._id)

        res.json({ success: true, userDate, token, message: "Login Successful" })

    } catch (error) {
        console.log(error.message);

        res.json({ success: false, message: error.message })
    }
}


// Check if User is authenticated
export const checkAuth = (req, res) => {
    res.json({ success: true, user: req.user })
}

// Update User profile details
export const updateProfile = async (req, res) => {
    try {

        const { profilePic, fullName, bio } = req.body;

        const userId = req.user._id;

        let updatedUser;

        if (!profilePic) {
            updatedUser = await User.findByIdAndUpdate(userId, { bio, fullName }, { new: true });
        } else {
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, { profilePic: upload.secure_url, bio, fullName }, { new: true });
        }

        res.json({ success: true, user: updatedUser })

    } catch (error) {
        console.log(error.message);

        res.json({ success: false, message: error.message })
    }
}