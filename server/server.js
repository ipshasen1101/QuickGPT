// nodemon package will automatically restartt our backend server whenever we make changes in code), "server": "nodemon server.js",this line added in scripts after replacing test line, type: module addded inpackage.json file(help us using import statement in project)
import express from 'express'
import userRouter from './routes/userRoutes.js'
import 'dotenv/config'
import connectDB from './configs/db.js'
import cors from 'cors'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import creditRouter from './routes/creditRoutes.js'
import { stripeWebhooks } from './controllers/webhooks.js'
const app= express()
await connectDB();
//Stripe webhooks
app.post('/api/stripe',express.raw({type:'application/json'}),stripeWebhooks)
//deploy backend on online server.we will deploy on vercel

//Middleware
app.use(cors())
app.use(express.json())
//Routes
app.get('/',(req,res)=> res.send(`Server is Live!`))
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message',messageRouter)
app.use('/api/credit',creditRouter)
const PORT = process.env.PORT || 3000
app.listen (PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
}) 