import Router from 'express';
import { clearChat, createGroupChat, getAllGroupChats } from '../controllers/chatControllers.js';
import protectRoute from '../middleware/protectRoute.js';

const router = Router();

router.post('/clear/:id',protectRoute,clearChat);
router.post('/createGroup',protectRoute,createGroupChat);
router.get('/groupChat',protectRoute,getAllGroupChats);
export default router;