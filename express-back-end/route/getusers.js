
const express = require("express");
const { Router } = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get('/api/query', (req, res) => {
    db.query("SELECT * FROM users WHERE id=100")
      .then(data =>{
        res.json(data.rows[0])
      })
  });
  return router;
};