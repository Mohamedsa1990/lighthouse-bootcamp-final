const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/', (req, res) => {
      db.query("SELECT * FROM users WHERE id=100")
        .then(data =>{
          return res.json(data.rows[0])
        });
    });
  return router;
};