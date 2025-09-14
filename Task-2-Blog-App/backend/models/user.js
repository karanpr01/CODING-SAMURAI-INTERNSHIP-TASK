import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Name is Required"]
        },
        email:{
            type: String,
            required:[true, "Email is Required"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email",
            ],
        },
        password:{
            type: String,
            required: [true, "Password is Required"],
            minlength: 6,
        },
    },
    { timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;