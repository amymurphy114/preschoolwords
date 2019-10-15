import Connection from '../dbconnection'; 

module.exports = app => {
  app.get('/listWords', (req, res) => {
    Connection.connect(function(err) {
      if (err) console.log(err); 
    });
    Connection.query('SELECT * from words', function (err, rows, fields) {
      if (err) console.log(err); 
      res.send(rows); 
    })
  });
  
};
