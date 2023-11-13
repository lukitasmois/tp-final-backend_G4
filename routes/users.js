var express = require('express');
var router = express.Router();
const dataUser = require('../data/users.js');
const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async(req,res) =>{
  try {
    const newUser = req.body;
    const result = await dataUser.addUser(newUser);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
})

module.exports = router;
