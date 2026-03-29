import express from 'express'
import { createChat } from '../controllers/Chatcontroller.js';
import { protect } from '../middlewares/auth.js';
import { getChats } from '../controllers/Chatcontroller.js';
import { deleteChat } from '../controllers/Chatcontroller.js';
const chatRouter =express.Router();
chatRouter.get('/create',protect,createChat);
chatRouter.get('/get',protect,getChats);
chatRouter.post('/delete',protect,deleteChat);


export default chatRouter;