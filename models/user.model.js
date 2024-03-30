const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
  createdPlaylist: [
    {
      name: String,
      songs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Song",
        },
      ],
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
