let express = require('express');
let router = express.Router();
let fs = require('fs');
var cors = require('cors');
let cryptojs = require("crypto-js")

const bodyParser = require('body-parser');
let urlEncoderParser = bodyParser.urlencoded({extended: true});

// TODO:In one of the GETs, decrypt and check the pw
//get all of the users
router.get('/',cors(), (req, res, next) =>{
  fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    
    res.send(users);
    
  })
});

// TODO: Get a user with the :userId (from the url params)

router.get('/:userid',cors(), (req, res, next) =>{

  let id = req.params.userid;
  fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);

      const user = users.filter(x=>x.id == id)
      res.send(user);
    
  })
});

//Login
router.post('/login',urlEncoderParser, (req, res)=> {
  fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    users.forEach(user => {

    console.log(user.userName, user.userPass);
    if (req.body.userName == user.userName && req.body.userPass == user.userPass) {
      console.log(user);
      res.send(user);
      // fs.readFile('jsonfiles/users.json', (err, data) => {
      //   if (err) throw err;
      //   let users = JSON.parse(data);
      //     res.send(html);
      //     })
  }
  else{
    response.sendStatus(401);
  }
});
})
})



//Post user
//Encrypt the password!
router.post('/newuser',cors(),(req, res, next) =>{
    let newUser = req.body;

  fs.readFile('jsonfiles/users.json', (err, data) => {
      if (err) throw err;
      let userList = JSON.parse(data);

        // find last used Id
        let lastId = userList.length;
        newUser.id = (lastId + 1);

        userList.push(newUser);

        let saveUsers = JSON.stringify(userList, null, 2);
        fs.writeFile('jsonfiles/users.json', saveUsers, (err,data)=>{
        if (err) throw err;
        });
  })
});


router.put('/updateuser/:userId',cors(),(req, res, next) =>{
  //Get the object sent to the request 
  let updatedUser = req.body;
  //Get the url parameter id
  let userId = req.params.userId
fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;

    let userList = JSON.parse(data);
    let user = userList.filter(user =>{
      return user.id == userId;
    })[0];

    //getting the users values
    const keys= Object.keys(user);

      //foreach value, update the value to the one provided
      keys.forEach(key => {
         user[key] = updatedUser[key]
      });

    
      let saveUsers = JSON.stringify(userList, null, 2);
      fs.writeFile('jsonfiles/users.json', saveUsers, (err,data)=>{
      if (err) throw err;
      });
      
    res.send(user);
})
});

module.exports = router;
