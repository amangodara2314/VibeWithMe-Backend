const User = require("../models/user.model");
const { encryptPassword, decryptPassword } = require("../utils/encrypt");

class UserController {
  signup(data) {
    return new Promise((res, rej) => {
      try {
        const user = new User({
          name: data.name,
          email: data.email,
          password: encryptPassword(data.password),
        });
        user
          .save()
          .then((success) => {
            res({
              msg: "Account Created Successfully",
              status: 1,
            });
          })
          .catch((err) => {
            rej({
              data,
              msg: "Unable to Create account",
              status: 0,
            });
          });
      } catch (error) {
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  login(data) {
    return new Promise(async (res, rej) => {
      try {
        const user = await User.findOne({ email: data.email }).populate(
          "favoriteSongs"
        );

        if (user) {
          if (decryptPassword(user.password) == data.password) {
            res({
              msg: "Login Successfull",
              status: 1,
              user,
            });
          } else {
            rej({
              msg: "Incorrect Password",
              status: 0,
            });
          }
        } else {
          rej({
            msg: "Invalid Email",
            status: 0,
          });
        }
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  updateFavSong({ user, song_id, flag }) {
    return new Promise(async (res, rej) => {
      try {
        const client = await User.findOne({ email: user });
        if (!client) {
          rej({
            msg: "User not found",
            status: 0,
          });
          return;
        }
        let favSongs = client.favoriteSongs;

        if (flag) {
          if (!favSongs.includes(song_id)) {
            favSongs.push(song_id);
          }
        } else {
          favSongs = favSongs.filter((song) => song._id != song_id);
        }

        await User.updateOne({ email: user }, { favoriteSongs: favSongs });
        const curr_user = await User.findOne({ email: user }).populate(
          "favoriteSongs"
        );

        res({
          msg: "Updated successfully",
          status: 1,
          curr_user,
        });
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
  createPlaylist({ user, name, songs }) {
    return new Promise(async (res, rej) => {
      try {
        const client = await User.findOne({ email: user });
        if (!client.createdPlaylist) {
          client.createdPlaylist = [];
        }
        client.createdPlaylist.push({ name, songs });
        await client.save();
        const updatedClient = await User.findOne({ email: user });
        res({
          msg: "Playlist Created",
          status: 1,
          updatedClient,
        });
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }
}

module.exports = UserController;
