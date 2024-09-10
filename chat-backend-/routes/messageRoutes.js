import Router from "express";
import { getGroupMessages, getMessages, sendGroupMessage, sendMessage } from "../controllers/messageControllers.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.post("/send/:id",protectRoute,sendMessage);
router.get("/:id",protectRoute,getMessages);
router.get("/group/:id",protectRoute,getGroupMessages);
router.post("/sendGroup/:id",protectRoute,sendGroupMessage);

export default router;