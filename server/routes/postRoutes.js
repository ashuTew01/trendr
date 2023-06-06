import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/postsController.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();


//Read
router.get("/:userId", verifyToken, getFeedPosts);      // IMP
router.get("/:userId/posts", verifyToken, getUserPosts);


//Update
router.patch("/:id/like", verifyToken, likePost);

export default router;