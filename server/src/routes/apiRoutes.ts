import express, { Request, Response } from "express";
import {
  addMemberController,
  getAllMemberController,
  deleteMemberController,
  updateMemberController,
  getSingleMemberController,
  addMemberToGroupController,
} from "../controllers/memberListController";
import {
  addGroupController,
  getAllGroupController,
  deleteGroupController,
  updateGroupController,
  getSingleGroupController,
  removeMemberFromGroupController,
} from "../controllers/groupListController";

const router = express.Router();

// Member Actions
// Member GET
router.get("/member/all", getAllMemberController);
router.get("/member/:id", getSingleMemberController);

// Member POST
router.post("/member/add", addMemberController);
router.post("/member/delete/:id", deleteMemberController);
router.post("/member/update/:id", updateMemberController);
router.post("/member/to/group/:id", addMemberToGroupController);

// Group Actions
// Group GET
router.get("/group/all", getAllGroupController);
router.get("/group/:id", getSingleGroupController);

// Group POST
router.post("/group/add", addGroupController);
router.post("/group/delete/:id", deleteGroupController);
router.post("/group/update/:id", updateGroupController);
router.post("/group/remove/member/:id", removeMemberFromGroupController);

export default router;
