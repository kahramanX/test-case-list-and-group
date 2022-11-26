const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = Schema({
  memberID: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  imageBase64: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  birthday: {
    type: String,
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  createdDate: {
    type: String,
    default: new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "Turkey",
    }).format(new Date()),
  },
  updatedDate: {
    type: String,
  },
});

const MemberModel = mongoose.model("member", memberSchema);

export default MemberModel;
