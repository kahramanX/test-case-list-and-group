const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberListSchema = Schema({
  memberCount: {
    type: Number,
  },
  memberList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member",
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const MemberListModel = mongoose.model("MemberList", memberListSchema);

export default MemberListModel;
