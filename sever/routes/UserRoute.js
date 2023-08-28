import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/UserCntr.js";
import authTokenJwt from "../middleware/authJwt.js";

const router = express.Router();

// READ
router.get("/:id", authTokenJwt, getUser);
router.get("/:id/friends", authTokenJwt, getUserFriends);

// UPDATE
router.patch("/:id/:friendId", authTokenJwt, addRemoveFriend);

export default router;
