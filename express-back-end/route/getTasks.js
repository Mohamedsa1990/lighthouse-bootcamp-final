const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/', (req, res) => {
      db.query("SELECT * FROM tasks")
        .then(data =>{
          return res.json(data.rows)
        });
    });
  return router;
};