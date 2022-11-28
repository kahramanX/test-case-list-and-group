import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { options } from "../types/types";

//Models
import MemberModel from "../models/MemberSchema";
import GroupModel from "../models/GroupSchema";
import { send } from "process";

// Member Actions

// GET
export const getAllMemberController = (req: Request, res: Response) => {
  MemberModel.find().then((response: any) => {
    res.json({ memberCount: response.length, data: response });
  });
};

export const getSingleMemberController = (req: Request, res: Response) => {
  MemberModel.findOne({ _id: req.params.id }).then((response: any) => {
    res.json({ data: response });
  });
};

// POST
export const addMemberController = (req: Request, res: Response) => {
  const { firstName, lastName, imageBase64, email, birthday, phone } = req.body;

  const addMember = MemberModel({
    memberID: uuidv4(),
    firstName: firstName,
    lastName: lastName,
    imageBase64: imageBase64,
    email: email,
    birthday: birthday,
    phone: phone,
    updatedDate: new Intl.DateTimeFormat("tr-TR", options).format(new Date()),
  });

  addMember.save((err: any, result: any) => {
    if (result) {
      res.json({ status: true });
    } else {
      console.log(err);
      res.json({ status: false });
    }
  });
};

export const deleteMemberController = (req: Request, res: Response) => {
  MemberModel.findByIdAndRemove({ _id: req.params.id })
    .then((response: any) => {
      res.json({ status: true });
    })
    .catch((error: any) => {
      res.json({ status: false });
    });
};

export const updateMemberController = (req: Request, res: Response) => {
  const { firstName, lastName, imageBase64, email, birthday, phone } = req.body;

  MemberModel.findByIdAndUpdate(req.params.id, {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    imageBase64: imageBase64,
    email: email,
    birthday: birthday,
    updatedDate: new Intl.DateTimeFormat("tr-TR", options).format(new Date()),
  })
    .then((response: any) => {
      res.json({ status: true });
    })
    .catch((error: any) => {
      res.json({ status: false });
    });
};

export const addMemberToGroupController = (req: Request, res: Response) => {
  const { selectedGroups } = req.body;
  const memberID = req.params.id;

  MemberModel.findOne({ _id: memberID })
    .then((memberInfos: any) => {
      if (memberInfos.groups.length === 0) {
        for (let i = 0; i < selectedGroups.length; i++) {
          memberInfos.groups.push(selectedGroups[i]);
        }
      } else {
        memberInfos.groups = [];
        for (let i = 0; i < selectedGroups.length; i++) {
          memberInfos.groups.push(selectedGroups[i]);
        }
      }

      //memberInfos.save();
      for (let i = 0; i < memberInfos.groups.length; i++) {
        GroupModel.findOne({
          _id: memberInfos.groups[i].groupID,
        }).then((groupInfos: any) => {
          console.log(groupInfos.members.length + " = uzunluğu");

          if (groupInfos.members.length >= 1) {
            console.log("0 den büyük - uzunluk = " + groupInfos.members.length);

            if (groupInfos.members[i]._id != memberID) {
              groupInfos.members.push(memberInfos);
              console.log("pushlama alanına girdi");
            } else {
              console.log("pushlanamz");
            }
          } else if (groupInfos.members.length === 0) {
            console.log("0a eşit");
            groupInfos.members.push(memberInfos);
          }

          groupInfos.save();
        });
      }

      res.json({ status: true });
    })
    .catch((error: any) => {
      console.log(error);
      res.json({ status: false });
    });
};
