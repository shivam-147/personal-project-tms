import mongoose from "mongoose";

const dbconfig = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('[MONGODB connected]')
    }catch(err){
        console.log('[ERROR] database configuring. ', err)
    }
}

export { dbconfig }