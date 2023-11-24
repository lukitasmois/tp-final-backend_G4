var express = require("express");
var router = express.Router();
const controllerUser = require("../controllers/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res) => {
  try {
    const newUser = req.body;
    const result = await controllerUser.addUser(newUser);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const user = await controllerUser.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await controllerUser.generateToken(user);
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(401).send("Autenticacion fallida");
  }
});

router.get("/user/:id", async function (req, res) {
  res.json(await controllerUser.getUser(req.params.id));
});

router.get("/getUsers", async function (req, res) {
  res.json(await controllerUser.getUsers());
});

router.post("/alquilar", async function alquilar(req, res) {
  const idUser = req.body.idUser;
  const idLibro = req.body.id;
  res.json(await controllerUser.alquilar(idUser, idLibro));
});

router.post("/devolver", async function devolver(req, res) {
  const idUser = req.body.idUser;
  const idLibro = req.body.idLibro;
  console.log(idUser, idLibro);
  res.json(await controllerUser.devolver(idUser, idLibro));
});

module.exports = router;
