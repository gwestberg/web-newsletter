const express = require('express');
const router = express.Router();
const fs = require('fs');
const cors = require('cors');

const bodyParser = require('body-parser');
let urlEncoderParser = bodyParser.urlencoded({extended: true});


// TODO: Encrypt the admin-password, decrypt it to validate login.

//Creates the login for the admin
router.get('/',cors(), (req, res, next)=> {

  //Skapa ett html-formulär och skicka den i res.send
  let html ='';
  html += "<body>";
        html += `<form action="/admin/panel" method="post" name="adminForm">`;
        html += `<label for="name">Username:</label><br>`;
        html += ` <input type="text" name="name" ><br>`;
        html += ` <label for="pword">Password:</label><br>`;
        html += `<input type="password "name="pword"><br><br>`;
        html += `<input type="submit" value="Submit">`;
        html += "</form> ";
  html += "</body>";

    res.send(html);

})



//render the admin-panel depending on if the validation succeds or not
router.post('/panel', urlEncoderParser, (req, res)=> {
  fs.readFile('jsonfiles/admin.json', (err, data) => {
    if (err) throw err;
    let admin = JSON.parse(data);
    console.log(admin.name, admin.passw);
    if (req.body.name == admin.name && req.body.pword == admin.passw) {

      fs.readFile('jsonfiles/users.json', (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data);

          let html = '';
          html += "<html>";
          html += "<body>";

            users.forEach(user => {
              html += `<div id=${user.id}>`;
              html += `Username: ${user.userName}<br>`;
              html += `Email: ${user.email}<br>`;

              if (user.wantsNewsletter === true) {
                html += `Newsletter: <input type="checkbox" id="${user.id}" name="${user.username}" checked> <br><br>`;
            } else {
                html += `Newsletter: <input type="checkbox" id="${user.id}" name="${user.username}"> <br><br>`;
            }
            html += "</div>";
          });
          users.forEach(user => {
            if (user.wantsNewsletter === true) {
              html += `<br/><br/>`;
              html += `<div>`;
              html += `Email: ${user.email}, `;
              html += "</div>";
            } 
          });
         

          html += "</body>";
          html += "</html>";

          res.send(html);
          })
  }
  else{
    response.sendStatus(401);
  }
})
})


module.exports = router;