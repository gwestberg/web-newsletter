let express = require('express');
let router = express.Router();
let fs = require('fs');
var cors = require('cors');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
let urlEncoderParser = bodyParser.urlencoded({
  extended: true
});

// TODO:In one of the GETs, decrypt and check the pw
//get all of the users
router.get('/', cors(), (req, res, next) => {
  fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);

    res.send(users);

  })
});


// TODO: Get a user with the :userId (from the url params)

router.get('/:userid', (req, res, next) => {

  let id = req.params.userid;
  fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);

    users.forEach(user => {
      if (user.id == id) {
        console.log(user);
      }
    });

    const user = users.filter(x => x.id == id)
    
    res.send(userTosend= {
      userName: user.userName,
      email: user.email,
      wantsNewsletter: user.wantsNewsletter
    });

  })
});

//Login
router.post('/login', (req, res) => {
  fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    users.forEach(user => {

      console.log(user.userName, user.userPass);
      if (req.body.userName == user.userName && req.body.userPass == user.userPass) {
        console.log(user);
        res.send(
          user= { 
            id: user.id,
            userName: user.userName,
            email: user.email,
            wantsNewsletter: user.wantsNewsletter
          });
      }
    });
    // res.send("null");
  })
})



//Post user
//Encrypt the password!
router.post('/newuser', (req, res, next) => {
  let newUser = req.body;
  let username = req.body.userName;
  let userpass = req.body.userPass;
  let email = req.body.email;
  let newsletter = req.body.wantsNewsletter;

  console.log(username);
  console.log(userpass);
  console.log(email);
  console.log(newsletter);


  fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;
    let userList = JSON.parse(data);

    // find last used Id
    let lastId = userList.length;
    newUser.id = (lastId + 1);

    userList.push(newUser);

    let saveUsers = JSON.stringify(userList, null, 2);
    fs.writeFile('jsonfiles/users.json', saveUsers, (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  })
});


router.put('/updateuser/:userId', cors(), (req, res, next) => {
  //Get the object sent to the request 
  let updatedUser = req.body;
  //Get the url parameter id
  let userId = req.params.userId
  fs.readFile('jsonfiles/users.json', (err, data) => {
    if (err) throw err;

    let userList = JSON.parse(data);
    let user = userList.filter(user => {
      return user.id == userId;
    })[0];

    //getting the users values
    const keys = Object.keys(user);

    //foreach value, update the value to the one provided
    keys.forEach(key => {
      user[key] = updatedUser[key]
    });


    let saveUsers = JSON.stringify(userList, null, 2);
    fs.writeFile('jsonfiles/users.json', saveUsers, (err, data) => {
      if (err) throw err;
    });

    res.send(user);
  })
});

module.exports = router;