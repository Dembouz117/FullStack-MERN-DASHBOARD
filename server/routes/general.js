import express from 'express';
//For backend, include the .js part
import { getUser, getDashboardStats } from "../controllers/general.js";

const router = express.Router();
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);

export default router;