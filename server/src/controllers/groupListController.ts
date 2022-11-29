import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { options } from "../types/types";

//Models
import GroupModel from "../models/GroupSchema";
import MemberModel from "../models/MemberSchema";

export const addGroupController = (req: Request, res: Response) => {
  const { groupName } = req.body;

  const addMember = GroupModel({
    groupID: uuidv4(),
    groupName: groupName,
    updatedDate: new Intl.DateTimeFormat("tr-TR", options).format(new Date()),
  });

  addMember.save((err: any, result: any) => {
    if (result) {
      res.json({ status: true });
      //const addToMemberList = MemberListModel({});
    } else {
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
  GroupModel.findById({ _id: req.params.id })
    .then((groupInfos: any) => {
      for (let i = 0; i < groupInfos.members.length; i++) {
        MemberModel.findOne({
          _id: groupInfos.members[i]._id,
        }).then((memberInfos: any) => {
          for (let j = 0; j < memberInfos.groups.length; j++) {
            if (memberInfos.groups[j].groupID === groupInfos._id.toString()) {
              console.log("splice edildi");
              memberInfos.groups.splice(j, 1);
            }
          }

          memberInfos.save();
        });
      }

      GroupModel.findByIdAndRemove({ _id: req.params.id }).then(
        (groupInfos2: any) => {
          res.json({ status: true });
        }
      );
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
      res.json({ status: true });
    })
    .catch((error: any) => {
      res.json({ status: false });
    });
};

export const removeMemberFromGroupController = (
  req: Request,
  res: Response
) => {
  const { memberID, groupID } = req.params;

  GroupModel.findOne({ _id: groupID }).then((groupInfos: any) => {
    for (let i = 0; i < groupInfos.members.length; i++) {
      if (groupInfos.members[i]._id.toString() === memberID) {
        groupInfos.members.splice(i, 1);
      }
    }
    groupInfos.save();
  });

  MemberModel.findOne({ _id: memberID }).then((memberInfos: any) => {
    for (let i = 0; i < memberInfos.groups.length; i++) {
      if (memberInfos.groups[i].groupID === groupID) {
        memberInfos.groups.splice(i, 1);
      }
    }
    memberInfos.save();
    res.json({ status: true });
  });
};
