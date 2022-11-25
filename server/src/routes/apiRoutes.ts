import express, { Request, Response } from "express";

const router = express.Router();

// Member Actions
// Member GETs
router.get("/all-member", (req: Request, res: Response) => {
  res.json({ info: "all member" });
});

// Member POSTs
router.post("/add", (req: Request, res: Response) => {
  res.json();
});

// Group Actions
// Group GETs
router.get("/all-group", (req: Request, res: Response) => {
  res.json({ info: "all group" });
});

// Group POSTs

export default router;
