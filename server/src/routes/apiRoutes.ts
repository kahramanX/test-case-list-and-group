import express, { Request, Response } from "express";

const router = express.Router();

// Member Actions
router.get("/all-member", (req: Request, res: Response) => {
  res.json({ what: "yeaaa" });
});

// Group Actions
router.get("/all-group", (req: Request, res: Response) => {
  res.json({ what: "yeaaa" });
});

export default router;
