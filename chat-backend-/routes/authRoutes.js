import Router  from "express";
import multer from "multer";
import { login, signup, logout } from "../controllers/authControllers.js";

const router = Router();

const upload = multer({dest:"uploads/"});

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

export default router;