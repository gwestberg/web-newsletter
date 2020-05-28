var express = require('express');
var router = express.Router();
var fs = require('fs');
var cors = require('cors');


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
