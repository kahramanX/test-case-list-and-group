import express, { Request, Response } from "express";
import {
  addMemberController,
  getAllMemberController,
  deleteMemberController,
  updateMemberController,
  getSingleMemberController,
} from "../controllers/memberListController";
import {
  addGroupController,
  getAllGroupController,
  deleteGroupController,
  updateGroupController,
  getSingleGroupController,
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

// Group Actions
// Group GET
router.get("/group/all", getAllGroupController);
router.get("/group/:id", getSingleGroupController);

// Group POST
router.post("/group/add", addGroupController);
router.post("/group/delete/:id", deleteGroupController);
router.post("/group/update/:id", updateGroupController);

export default router;
