var express = require('express');
var router = express.Router();
let fs = require('fs');
let cors = require('cors');


//admin-hantering, hämta admin, kontrollera admin, visa admin-funktionalitet
router.get('/',cors(), function(req, res, next) {
    fs.readFile("jsonfiles/admin.json",(err,data)=>{

        if(err) throw err;
    
        const admin = JSON.parse(data);
    
        res.send(admin);
      });
});

module.exports = router;
