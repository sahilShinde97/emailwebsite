import mongoose from "mongoose";


//connect to mongodb database

const connectDB = async () => {
    mongoose.connection.on('connected', ()=> console.log("DataBase Connected"))

    await mongoose.connect(`${process.env.MONGODB_URI}/emailMarketing`)
}

export default connectDB;