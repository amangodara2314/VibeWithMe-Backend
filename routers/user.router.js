const { Router } = require("express");
const UserController = require("../controllers/user.controller");
const UserRouter = Router();

UserRouter.post("/signup", (req, res) => {
  new UserController()
    .signup(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

UserRouter.post("/login", (req, res) => {
  new UserController()
    .login(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

UserRouter.put("/update-fav", (req, res) => {
  new UserController()
    .updateFavSong(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

UserRouter.put("/create-playlist", (req, res) => {
  new UserController()
    .createPlaylist(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

UserRouter.delete("/delete-playlist/:user/:id", (req, res) => {
  new UserController()
    .deletePlaylist(req.params.user, req.params.id)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

UserRouter.put("/add-songs", (req, res) => {
  new UserController()
    .addSongs(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

UserRouter.delete("/remove-song", (req, res) => {
  new UserController()
    .removeSong(req.body)
    .then((success) => res.send(success))
    .catch((err) => res.send(err));
});

module.exports = UserRouter;
