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
          console.log(output[29])
          return res.json(output);
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json(err)
        });
      });
      console.log("******************************");
      console.log("response for Users sent");
      console.log("******************************");
      return router;
    };
    

// let output = [];
//     db.query(`SELECT * FROM jobs`)
//       .then(data =>{
//         output = data.rows
//         return db.query(`SELECT * FROM requirements JOIN tasks ON task_id = tasks.id`);
//       })
//       .then((data) => {
//         output = output.map((job) => {
//           let requirements = data.rows.filter((requirement) => {
//             return requirement.job_id === job.id;
//           });
//           if (!requirements) {
//             requirements = [];
//           }
//           return {...job, requirements};
//         });