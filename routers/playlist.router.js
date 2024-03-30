const { Router } = require("express");
const PlaylistController = require("../controllers/playlist.controller");
const fileUpload = require("express-fileupload");

const PlaylistRouter = Router();

PlaylistRouter.post(
  "/create",
  fileUpload({
    createParentPath: true,
  }),
  (req, res) => {
    new PlaylistController()
      .create(req.body, req.files.cover)
      .then((success) => {
        res.send(success);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

PlaylistRouter.get("/:id?", (req, res) => {
  new PlaylistController()
    .read(req.params.id)
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

PlaylistRouter.delete("/delete/:id", (req, res) => {
  new PlaylistController()
    .delete(req.params.id)
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

PlaylistRouter.put(
  "/update/:id",
  fileUpload({
    createParentPath: true,
  }),
  (req, res) => {
    new PlaylistController()
      .update(req.params.id, req.body, req.files?.cover, req.files?.audio)
      .then((success) => {
        res.send(success);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

module.exports = PlaylistRouter;
