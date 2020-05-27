var express = require('express');
var router = express.Router();
var fs = require('fs');
var cors = require('cors');

/* GET users listing. */
router.get('/',cors(), function(req, res, next) {
  
  fs.readFile("jsonfiles/admin.json",(err,data)=>{

    if(err) throw err;

    const users = JSON.parse(data);

    res.send(users);
  });
});


module.exports = router;