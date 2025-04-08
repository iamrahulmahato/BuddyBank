const mongoos = require("mongoose");

const schma = new mongoos.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: "String",
      required: "true",
    },
    name: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoos.model("User", schma);
module.exports = User;
