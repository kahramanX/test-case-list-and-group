const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = Schema({
  memberID: {
    type: Number,
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
  birthday: {
    type: Date,
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
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

const memberModel = mongoose.model("Member", memberSchema);

export default memberModel;
