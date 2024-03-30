const { Router } = require("express");
const fileUpload = require("express-fileupload");
const SongController = require("../controllers/song.controller");

const SongRouter = Router();

SongRouter.post(
  "/create",
  fileUpload({
    createParentPath: true,
  }),
  (req, res) => {
    new SongController()
      .create(req.body, req.files.cover, req.files.audio)
      .then((success) => {
        res.send(success);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

SongRouter.get("/:id?", (req, res) => {
  new SongController()
    .read(req.params.id)
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

SongRouter.get("/search/:query", (req, res) => {
  new SongController()
    .search(req.params.query)
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

SongRouter.delete("/delete/:id", (req, res) => {
  new SongController()
    .delete(req.params.id)
    .then((success) => {
      res.send(success);
    })
    .catch((err) => {
      res.send(err);
    });
});

SongRouter.put(
  "/update/:id",
  fileUpload({
    createParentPath: true,
  }),
  (req, res) => {
    new SongController()
      .update(req.params.id, req.body, req.files?.cover, req.files?.audio)
      .then((success) => {
        res.send(success);
      })
      .catch((err) => {
        res.send(err);
      });
  }
);

module.exports = SongRouter;
