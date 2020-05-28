var express = require('express');
var router = express.Router();
var fs = require('fs');
var cors = require('cors');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

// let urlEncoderParser = bodyParser.urlencoded({extended: true});

//get all of the users
router.get('/',cors(), (req, res, next) =>{
  fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    
    res.send(users);
    
  })
});

//Get a user with the :userId (from the url params)
router.get('/:userid',cors(), (req, res, next) =>{

  let id = req.params.userid;
  fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);

      const user = users.filter(x=>x.id == id)
      res.send(user);
    
  })
});


//Post user
router.post('/newuser',cors(),(req, res, next) =>{
    let newUser = req.body;

  fs.readFile('jsonfiles/users.json', (err, data) => {
      if (err) throw err;
      usersInList = JSON.parse(data);

        // find last used Id
        let lastId = usersInList.length;
        newUser.id = (lastId + 1);

        usersInList.push(newUser);

        let saveUsers = JSON.stringify(usersInList, null, 2);
        fs.writeFile('jsonfiles/users.json', saveUsers, (err,data)=>{
        if (err) throw err;
        });
  })
});

router.post('/updateuser',cors(),(req, res, next) =>{
  let newUser = req.body;

fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;
    usersInList = JSON.parse(data);

      // find last used Id
      let lastId = usersInList.length;
      newUser.id = (lastId + 1);

      usersInList.push(newUser);

      let saveUsers = JSON.stringify(usersInList, null, 2);
      fs.writeFile('jsonfiles/users.json', saveUsers, (err,data)=>{
      if (err) throw err;
      });
})
});

module.exports = router;
