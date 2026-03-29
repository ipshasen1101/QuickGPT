import mongoose from 'mongoose'
const connectDB = async ()=>{
    try{
        mongoose.connection.on('connected',()=>console.log('database connected')) //The mongoose.connection.on('connected', ...) line registers a listener (a watcher). It tells Mongoose to listen for the event.
        await mongoose.connect(`${process.env.MONGODB_URI}/quickgpt`) //database named quickgpt created
    }catch(error){
       console.log(error.message)
    }
}
export default connectDB;
//Here is the exact execution order of connection.on and  mongoose.connect:
// 1.Setup (mongoose.connection.on): This line runs first, but it only registers the listener. It does not run the console.log yet.
// 2.Initiation (await mongoose.connect): This line runs next. It tells Mongoose to start connecting and pauses the connectDB function here.
// 3.Connection Success: Once the database connection is finalized, Mongoose emits the connected event.
// 4.Callback Execution: The listener registered in step 1 hears the event and executes () => console.log('database connected'). 