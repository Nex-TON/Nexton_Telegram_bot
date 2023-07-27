const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    },
    chatId: {
        type: Number
    },
});

module.exports = mongoose.model("User", userSchema);
