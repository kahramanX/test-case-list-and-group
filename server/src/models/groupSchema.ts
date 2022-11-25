const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = Schema({
  groupID: {
    type: Number,
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
    type: Date,
  },
});

const groupModel = mongoose.model("Group", groupSchema);

export default groupModel;
