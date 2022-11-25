import express, { Request, Response } from "express";

//Models
import memberModel from "models/MemberSchema";
const router = express.Router();

// Member Actions
// Member GETs
router.get("/all-member", (req: Request, res: Response) => {
  res.json({ info: "all member" });
});

// Member POSTs
router.post("/member/add", (req: Request, res: Response) => {
  console.log(req.body);

  res.json({ info: "test" });
});

// Group Actions
// Group GETs
router.get("/all-group", (req: Request, res: Response) => {
  res.json({ info: "all group" });
});

// Group POSTs

export default router;
