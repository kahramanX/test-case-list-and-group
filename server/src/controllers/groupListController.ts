import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
//Models
import GroupSchema from "../models/GroupSchema";
export const addGroupController = (req: Request, res: Response) => {
  res.json();
};

export const getGroupController = (req: Request, res: Response) => {
  GroupSchema.find().then((response: any) => {
    res.json({ groupCount: response.length, data: response });
  });
};
