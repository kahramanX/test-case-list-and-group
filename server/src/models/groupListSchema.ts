const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupListSchema = Schema({
  groupCount: {
    type: Number,
  },
  groupList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const GroupListModel = mongoose.model("GroupList", groupListSchema);

export default GroupListModel;
