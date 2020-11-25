const express = require('express');
const router = express.Router();

module.exports = (db) => {
    console.log("******************************");
    console.log("request for Users received");
    router.get('/', (req, res) => {
      db.query(`SELECT * FROM users JOIN skills
                ON users.id = skills.user_id
                JOIN tasks
                ON skills.task_id = tasks.id`)
        .then(data =>{
          console.log("******************************");
          console.log("response for Users sent");
          console.log("******************************");
          return res.json(data.rows)
        });
    });
  return router;
};