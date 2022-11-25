import express, { Request, Response } from "express";
import {
  addMemberController,
  getMembersController,
} from "../controllers/memberListController";
import {
  addGroupController,
  getGroupController,
} from "../controllers/groupListController";

const router = express.Router();

// Member Actions
// Member GETs
router.get("/member/all", getMembersController);

// Member POSTs
router.post("/member/add", addMemberController);

// Group Actions
// Group GETs
router.get("/group/all", getGroupController);

// Group POSTs
router.post("/group/add", addGroupController);

export default router;
