import express, { Request, Response } from "express";
import {
  addMemberController,
  getMembersController,
  deleteMemberController,
  updateMemberController,
} from "../controllers/memberListController";
import {
  addGroupController,
  getGroupController,
  deleteGroupController,
  updateGroupController,
} from "../controllers/groupListController";

const router = express.Router();

// Member Actions
// Member GETs
router.get("/member/all", getMembersController);

// Member POSTs
router.post("/member/add", addMemberController);
router.post("/member/delete/:id", deleteMemberController);
router.post("/member/update/:id", updateMemberController);

// Group Actions
// Group GETs
router.get("/group/all", getGroupController);

// Group POSTs
router.post("/group/add", addGroupController);
router.post("/group/delete/:id", deleteGroupController);
router.post("/group/update/:id", updateGroupController);

export default router;
