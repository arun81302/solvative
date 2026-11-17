import mongoose from "mongoose";

const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.URI)
        console.log('database connected successfully')

    }catch(err){
        console.log(err)
        process.exit(1)

    }
}

export default connectDB