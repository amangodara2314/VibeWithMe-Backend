const Playlist = require("../models/playlist.model");
const fs = require("fs");
class PlaylistController {
  create(data, image) {
    return new Promise((res, rej) => {
      try {
        if (image) {
          const imageName =
            new Date().getTime() +
            Math.floor(Math.random() * 2789) +
            image.name;
          const imageDestination = "./public/images/artist/" + imageName;

          image.mv(imageDestination, (err) => {
            if (err) {
              rej({
                msg: "Unable to upload image",
              });
              return;
            }
          });
          const myPlaylist = new Playlist({
            name: data.name,
            slug: data.slug,
            cover: imageName,
          });
          myPlaylist
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
          data = await Playlist.findById(id);
        } else {
          data = await Playlist.find();
        }
        res({
          msg: "data found",
          data,
          imageBaseUrl: "images/artist/",
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
        Playlist.deleteOne({ _id: id })
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
  update(id, data, image) {
    return new Promise(async (res, rej) => {
      try {
        let imageName;

        if (image) {
          fs.unlinkSync("./public/images/artist/" + data.oldName);
          imageName =
            new Date().getTime() +
            Math.floor(Math.random() * 2789) +
            image.name;
          const imageDestination = "./public/images/artist/" + imageName;

          await image.mv(imageDestination);
        }

        const updateObj = {
          name: data.name,
          slug: data.slug,
        };

        if (imageName) {
          updateObj.cover = imageName;
        }

        const result = await Playlist.updateOne({ _id: id }, updateObj);

        if (result.nModified === 0) {
          rej({ msg: "No Playlist updated" });
          return;
        }

        res({ msg: "Updated successfully" });
      } catch (error) {
        console.error(error);
        rej({ msg: "Internal Server Error" });
      }
    });
  }
}

module.exports = PlaylistController;
