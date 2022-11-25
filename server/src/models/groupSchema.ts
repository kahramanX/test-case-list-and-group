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
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: String,
  },
});

const GroupModel = mongoose.model("Group", groupSchema);

export default GroupModel;
