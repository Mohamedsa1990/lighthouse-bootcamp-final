const express = require('express');
const router = express.Router();

module.exports = (db) => {
    console.log("******************************");
    console.log("request for Users received");
    router.get('/', (req, res) => {
      let output = [];
      db.query(`SELECT * FROM users`)
        .then(data =>{
          output = data.rows
          return db.query(`SELECT
              skills.id AS id,
              user_id,
              task_id,
              name,
              description
            FROM skills JOIN tasks ON task_id = tasks.id`)  
        })
        .then((data) => {
          output = output.map((user) =>{
            let skills = data.rows.filter((skill) => {
              return skill.user_id === user.id;
            });
            if (!skills) {
              skills = [];
            }
            return {...user, skills};
          })
          return res.json(output);
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json(err)
        });
      });
      return router;
    };