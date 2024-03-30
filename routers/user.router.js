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

module.exports = UserRouter;
