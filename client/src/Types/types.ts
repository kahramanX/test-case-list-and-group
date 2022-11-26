export type ObjectID = {
  _id: string;
};
export type Count = {
  count: number;
};

export interface IGroup {
  _id: ObjectID;
  groupName: string;
  members: IMember[];
  createdDate: string;
  updatedDate: string;
}

export interface IMember {
  _id: ObjectID;
  memberID: string;
  firstName: string;
  lastName: string;
  imageBase64: string;
  email: string;
  birthday: string;
  groups: IGroup[];
  createdDate: string;
  updatedDate: string;
}

export interface IMemberAll {
  count: Count;
  data: IMember[];
}

export interface IGroupAll {
  count: Count;
  data: IGroup[];
}
