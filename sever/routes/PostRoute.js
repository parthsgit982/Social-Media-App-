import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/PostCntr.js";
import authTokenJwt from "../middleware/authJwt.js";

const router = express.Router();

// READ
router.get("/", authTokenJwt, getFeedPosts);
router.get("/:userId/posts", authTokenJwt, getUserPosts);

// UPDATE
router.patch("/:id/like", authTokenJwt, likePost);

export default router;
