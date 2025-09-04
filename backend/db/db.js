import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'
import dotenv from 'dotenv';

dotenv.config();


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`\n Connected to database DB HOST: ${connectionInstance.connection.host} DB NAME: ${connectionInstance.connection.name} `);
    }
    catch (error) {
        console.log("Error connecting to database", error);
        process.exit(1);
    }
}
export default connectDB;