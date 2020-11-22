const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/', (req, res) => {
      console.log("******************************");
      console.log("request for jobs received");
      let output = [];
      db.query(`SELECT * FROM jobs`)
        .then(data =>{
          output = data.rows
          return db.query(`SELECT * FROM requirements JOIN tasks ON task_id = tasks.id`);
        })
        .then((data) => {
          output = output.map((job) => {
            let requirements = data.rows.filter((requirement) => {
              return requirement.job_id === job.id;
            });
            if (!requirements) {
              requirements = [];
            }
            return {...job, requirements};
          });
          return db.query(`SELECT * FROM assignments JOIN users ON user_id = users.id`);
        })
        .then((data) => {
          allAssignments = data.rows;
          output = output.map((job) => {
            let assignments = allAssignments.filter((assignment) => {
              return assignment.job_id === job.id;
            });
            if (!assignments) {
              assignments = [];
            }
            return {...job, assignments};
          });
          console.log("response for jobs request sent");
          console.log("******************************");
          return res.json(output);
        });
    });
  return router;
};