import mongoose from "mongoose"
const transactionSchema= new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId,ref:"User", required:true},
    planId: {type:String,required:true},
    amount: {type:Number,required:true},
    credits: {type:String,required:true},
    isPaid: {type:Boolean,default:false},
},{timestamps:true}) //using timestamp it will automatically add timestamp when object was created
const Transaction = mongoose.model('Transaction',transactionSchema)
export default Transaction;