import Connection from "../dbconnection";
const bcrypt = require("bcrypt");
const saltRounds = 10;
//const { check, validationResult } = require("express-validator");

module.exports = app => {
  app.post("/createUser", function(req, res) {
    //var username = check(req.body.username).trim().escape();
    var email = req.body.email;
    var password = req.body.password;
    var firstname = req.body.firstname; 
    //const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   return res.status(422).json({ errors: errors.array() });
    // }

    //res.send("THIS IS YOUR API CALL MY FRIEND"+req.body.email);
    bcrypt.hash(password, saltRounds).then(function(hash) {
      Connection.query(
        "SELECT * FROM users WHERE email='" + email + "'",
        function(err, rows, fields) {
          if (err) {
            res.send("Error:" + err);
          }
          if (rows.length <= 0) {
            Connection.query(
              "INSERT INTO users SET email = ?, firstname = ?, password='" + hash + "'",
              [email, firstname],
              function(err, rows, fields) {
                if (err) throw err;
                res.send("success");
              }
            );
          } else {
            res.send("emailexists");
          }
        }
      );

      //res.send(username + " " + firstname + " " + hash);
    });
  });
};
