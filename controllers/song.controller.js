const Song = require("../models/song.model");
const fs = require("fs");

class SongController {
  create(data, image, audio) {
    return new Promise((res, rej) => {
      try {
        if (image && audio) {
          const imageName =
            new Date().getTime() +
            Math.floor(Math.random() * 2789) +
            image.name;
          const imageDestination = "./public/images/song/" + imageName;
          const songName =
            new Date().getTime() +
            Math.floor(Math.random() * 2789) +
            audio.name;
          const songDestination = "./public/audio/" + songName;

          image.mv(imageDestination, (err) => {
            if (err) {
              rej({
                msg: "Unable to upload image",
              });
              return;
            }
          });
          audio.mv(songDestination, (err) => {
            if (err) {
              rej({
                msg: "Unable to upload audio",
              });
              return;
            }
          });
          const mySong = new Song({
            name: data.name,
            slug: data.slug,
            artist: data.artist,
            audio: songName,
            cover: imageName,
          });
          mySong
            .save()
            .then((success) => {
              res({
                msg: "data uploaded successfully",
              });
            })
            .catch((err) => {
              rej({
                msg: "unable to upload data",
              });
            });
        }
      } catch (error) {
        rej({
          err: error,
          msg: "Interal Server Error",
        });
      }
    });
  }
  read(id) {
    return new Promise(async (res, rej) => {
      try {
        let data;
        if (id) {
          data = await Song.findById(id);
        } else {
          data = await Song.find();
        }
        res({
          msg: "data found",
          data,
          imageBaseUrl: "images/song/",
          songBaseUrl: "audio/",
        });
      } catch (error) {
        console.log(error);
        rej({
          msg: "internal server error",
        });
      }
    });
  }
  delete(id) {
    return new Promise((res, rej) => {
      try {
        Song.deleteOne({ _id: id })
          .then((success) => {
            res({
              msg: "data deleted successfully",
            });
          })
          .catch((err) => {
            rej({
              msg: "unable to delete data",
            });
          });
      } catch (error) {
        rej({
          msg: "internal server error",
        });
      }
    });
  }
  update(id, data, image, audio) {
    return new Promise(async (res, rej) => {
      try {
        let imageName, songName;

        if (image) {
          fs.unlinkSync("./public/images/song/" + data.oldName);
          imageName =
            new Date().getTime() +
            Math.floor(Math.random() * 2789) +
            image.name;
          const imageDestination = "./public/images/song/" + imageName;

          await image.mv(imageDestination);
        }

        if (audio) {
          songName =
            new Date().getTime() +
            Math.floor(Math.random() * 2789) +
            audio.name;
          const songDestination = "./public/audio/" + songName;

          await audio.mv(songDestination);
        }

        const updateObj = {
          name: data.name,
          slug: data.slug,
          artist: data.artist,
        };

        if (imageName) {
          updateObj.cover = imageName;
        }

        if (songName) {
          updateObj.audio = songName;
        }

        const result = await Song.updateOne({ _id: id }, updateObj);

        if (result.nModified === 0) {
          rej({ msg: "No song updated" });
          return;
        }

        res({ msg: "Updated successfully" });
      } catch (error) {
        console.error(error);
        rej({ msg: "Internal Server Error" });
      }
    });
  }
  search(query) {
    return new Promise(async (res, rej) => {
      try {
        const data = await Song.find({
          $or: [{ name: { $regex: `^${query}`, $options: "i" } }],
        });
        res({
          msg: "Song found",
          data,
          imageBaseUrl: "images/song/",
          songBaseUrl: "audio/",
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

module.exports = SongController;
