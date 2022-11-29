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
  groups: {
    type: Array,
  },
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

const MemberModel = mongoose.model("Member", memberSchema);

export default MemberModel;
