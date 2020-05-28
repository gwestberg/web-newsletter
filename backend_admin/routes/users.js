var express = require('express');
var router = express.Router();
var fs = require('fs');
var cors = require('cors');


router.use(cors());
/* GET users listing. */
router.get('/', (req, res, next) =>{
  fs.readFile('jsonfiles/users.json', (err, data) => {
      if (err) throw err;
      let users = JSON.parse(data);

      res.send(users);

  })
});

module.exports = router;
