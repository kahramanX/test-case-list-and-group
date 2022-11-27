import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { options } from "../types/types";

//Models
import MemberModel from "../models/MemberSchema";
import MemberListModel from "../models/MemberListSchema";

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
