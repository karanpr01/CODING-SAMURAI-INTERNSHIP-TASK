import mongoose from "mongoose";

const connectDB = async (mongoUri) => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("monogoDB connected successfully");
        
    } catch (error) {
        console.error("monogoDB connection error", error.message);

        process.exit(1);  //exit if DB fails
        
    }
}

export default connectDB