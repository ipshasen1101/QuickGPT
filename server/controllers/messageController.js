//text based ai chat message controller
import axios from "axios";
import imagekit from "../configs/imagekit.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import openai from "../configs/openai.js";
export const textMessageController = async (req , res)=>{
    try{
        if (req.user.credits<1){
      return   res.json({success:false, message:"you dont have enough credits to use this feature"})
      }
    const userId = req.user._id;
    const {chatId , prompt} =req.body;
    const chat=await Chat.findOne({userId,_id:chatId})
    chat.messages.push({role:"user",content:prompt,timestamp:Date.now(),isImage:false})
    const { choices} = await openai.chat.completions.create({
    model: "gemini-3-flash-preview",
    messages: [
       
        {
            role: "user",
            content: prompt,
        },
    ],
});
const reply = {...choices[0].message,timestamp:Date.now(),isImage:false}
 res.json({success:true, reply})
chat.messages.push(reply)
await chat.save()
await User.updateOne({_id:userId},{$inc:{credits:-1}}) //inc means incremental...we are decreasing credits by -1...adding data in database using chat,messages.push(reply) and awit chat.save()takes time so we move response line just after reply we get)
  
}catch(error){
 res.json({success:false, message:error.message})
    }
}
//Image Generation message controller
export const imageMessageController = async(req,res)=>{
    try{
      const userId=req.user._id;
      if (req.user.credits<2){
      return   res.json({success:false, message:"you dont have enough credits to use this feature"})
      }
      const {prompt,chatId,isPublished}=req.body
      // Find Chat
      const chat = await Chat.findOne({userId , _id:chatId})
      //push user message
      chat.messages.push({
        role:"user",
        content:prompt,
        timestamp:Date.now(),
        isImage:false})
        const encodedPrompt = encodeURIComponent(prompt)
        //Construct imagekit ai generation url
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/QUICKGPT/${Date.now()}.png?tr=w-800,h-800`;
        //trigger generation by fetching from Imagekit
        const aiImageResponse = await axios.get(generatedImageUrl,{responseType:"arraybuffer"})
        //convert to base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data,"binary").toString('base64')}`;
        //Upload to imagekit media library
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName:`${Date.now()}.png`,
            folder: "quickgpt"
        })
        const reply = {
            role:'assistant',
            content: uploadResponse.url,
            timestamp:Date.now(),
            isImage:true,
             isPublished}
        res.json({success: true,reply})
        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({_id:userId},{$inc:{credits:-2}}) 
    }catch(error){
      res.json({success:false,message:error.message})

    }
}