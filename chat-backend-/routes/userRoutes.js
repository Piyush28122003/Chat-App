import Router from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsers } from "../controllers/userControllers.js";

const router = Router();

router.get("/",protectRoute,getUsers);

export default router;