import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('mongodb connected successfully.');
    } catch (error) {
           console.error('Error connecting to MongoDB:', error);
    }
}
export default connectDB;