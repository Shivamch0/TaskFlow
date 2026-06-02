import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("Database connected successfully...")
    } catch (error) {
        console.log( "Something went wrong while connecting database..." , error);
        process.exit(1)
    }
}

export { connectDB }