const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    cover: {
      type: String,
    },
  },
  { timestamp: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
