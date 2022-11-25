import express, { Request, Response } from "express";
import { addMemberController } from "../controllers/memberListController";
import { addGroupController } from "../controllers/groupListController";

const router = express.Router();

// Member Actions
// Member GETs
router.get("/all-member", (req: Request, res: Response) => {
  res.json({ info: "all member" });
});

// Member POSTs
router.post("/member/add", addMemberController);

// Group Actions
// Group GETs
router.get("/all-group", (req: Request, res: Response) => {
  res.json({ info: "all group" });
});

// Group POSTs
router.post("/group/add", addGroupController);

export default router;
