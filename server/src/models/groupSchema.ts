const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = Schema({
  groupID: {
    type: String,
  },
  groupName: {
    type: String,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member",
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

const GroupModel = mongoose.model("group", groupSchema);

export default GroupModel;
