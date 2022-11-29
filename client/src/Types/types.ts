export interface ObjectID {
  _id: string;
}

export interface IGroup {
  _id: string;
  groupName: string;
  members: IMember[];
  createdDate: string;
  updatedDate: string;
}

export interface IMember {
  _id: string;
  memberID: string;
  firstName: string;
  lastName: string;
  imageBase64: string;
  email: string;
  birthday: string;
  groups: IGroup[];
  createdDate: string;
  updatedDate: string;
  phone: string;
}

export interface IMemberAll {
  memberCount: number;
  data: IMember[];
}

export interface IGroupAll {
  groupCount: number;
  data: IGroup[];
}

export type IAddMemberForm = {
  firstName: string;
  lastName: string;
  imageBase64: string;
  email: string;
  phone: string;
  birthday: string;
};

export type IAddGroupForm = {
  groupName: string;
};

export interface Ioptions {
  label: string;
  value: string;
}

export interface ISelectedGroup {
  label: string;
  value: string;
  groupID: string;
}
