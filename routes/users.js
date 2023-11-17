var express = require('express');
var router = express.Router();
const controllerUser = require('../controllers/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async(req,res) =>{
  try {
    const newUser = req.body;
    const result = await controllerUser.addUser(newUser);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
})

router.post('/login', async function (req,res,next){
  try {

      const user = await controllerUser.findByCredentials(req.body.email, req.body.password);
      const token = await controllerUser.generateToken(user);
      res.send({token});
  } catch (error) {
    console.log(error)
      res.status(401).send("Autenticacion fallida")
    }

})

module.exports = router;
