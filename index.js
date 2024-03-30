const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const SongRouter = require("./routers/songs.router");
const PlaylistRouter = require("./routers/playlist.router");
const UserRouter = require("./routers/user.router");
require("dotenv").config();
const MONGODB = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/user", UserRouter);
app.use("/song", SongRouter);
app.use("/playlist", PlaylistRouter);
mongoose
  .connect(MONGODB, {
    dbName: "VibeWithMe",
  })
  .then((success) => {
    app.listen(process.env.port || 5000, () => {
      console.log("db connected and server started");
    });
  })
  .catch((err) => {
    console.log("unable to connect server");
  });

module.exports = app;
