import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { options } from "../types/types";

//Models
import GroupModel from "../models/GroupSchema";
export const addGroupController = (req: Request, res: Response) => {
  const { groupName } = req.body;

  const addMember = GroupModel({
    groupID: uuidv4(),
    groupName: groupName,
    updatedDate: new Intl.DateTimeFormat("tr-TR", options).format(new Date()),
  });

  addMember.save((err: any, result: any) => {
    if (result) {
      console.log("Group Added ✅ ");
      res.json({ status: true });
      //const addToMemberList = MemberListModel({});
    } else {
      console.log("Group Could Not Added ❌ ");
      res.json({ status: false });
    }
  });
};

//GET
export const getAllGroupController = (req: Request, res: Response) => {
  GroupModel.find().then((response: any) => {
    res.json({ groupCount: response.length, data: response });
  });
};

export const getSingleGroupController = (req: Request, res: Response) => {
  GroupModel.findOne({ _id: req.params.id }).then((response: any) => {
    res.json({ data: response });
  });
};

// POST
export const deleteGroupController = (req: Request, res: Response) => {
  GroupModel.findByIdAndRemove({ _id: req.params.id })
    .then((response: any) => {
      res.json({ status: true });
    })
    .catch((error: any) => {
      res.json({ status: false });
    });
};

export const updateGroupController = (req: Request, res: Response) => {
  const { groupName } = req.body;

  GroupModel.findByIdAndUpdate(req.params.id, {
    groupName: groupName,
    updatedDate: new Intl.DateTimeFormat("tr-TR", options).format(new Date()),
  })
    .then((response: any) => {
      console.log(response);
      console.log("Group Updated ✅ ");
      res.json({ status: true });
    })
    .catch((error: any) => {
      console.log(error);
      console.log("Group Could Not Update ❌ ");
      res.json({ status: false });
    });
};
