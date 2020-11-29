const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/', (req, res) => {
      console.log("******************************");
      console.log("request for Tasks received");
      db.query("SELECT * FROM tasks")
        .then(data =>{
          console.log("response for Tasks sent");
          console.log("******************************");
          return res.json(data.rows)
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json(err)
        });
    });
  return router;
};