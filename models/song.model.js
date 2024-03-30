const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    name: {
      type: String,
      index: "text",
    },
    slug: {
      type: String,
    },
    cover: {
      type: String,
    },
    artist: {
      type: String,
    },
    fav: {
      type: Boolean,
      default: false,
    },
    audio: {
      type: String,
    },
  },
  { timestamp: true }
);

const Song = mongoose.model("Song", SongSchema);

module.exports = Song;
