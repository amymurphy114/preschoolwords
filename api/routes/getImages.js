import Connection from '../dbconnection'; 

module.exports = app => {
  app.get('/getImages', (req, res) => {
    const word_end = req.query.word_end;
    Connection.connect(function(err) {
      if (err) console.log(err); 
    });
    Connection.query(`SELECT * from words WHERE word_end='${word_end}'`, function (err, rows, fields) {
      if (err) console.log(err); 
      res.send(rows); 
    })
  });
};
