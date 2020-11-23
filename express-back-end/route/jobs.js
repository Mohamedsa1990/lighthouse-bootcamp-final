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
        console.log(output[86]);
        return res.json(output);
      });
  });

  router.put('/:id', (req, res) => {
    console.log("******************************");
    console.log("request to save job received");
    let incomingID = req.params.id;
    let incoming = req.body;
    let queryString = "";
    let values = [];
    if (incomingID ==0) {
      let keysString = ``;
      let variableString = ``;
      for (const key in incoming) {
        if (key !== "id") {
          if (variableString.length === 0) {
            values.push(incoming[key]);
            keysString += key;
            variableString += `$${values.length}`;
          } else {
            values.push(incoming[key]);
            keysString += `, ${key}`;
            variableString += `, $${values.length}`;
          }
        }
      }
      queryString = `INSERT INTO jobs (${keysString}) VALUES (${variableString})`;
      return db.query(queryString, values)
        .then((res) => {
          return db.query(`SELECT currval('jobs_id_seq')`);
        })
        .then((res2) => {
          console.log("*******************")
          console.log("response for successfully saved new job");
          return res2.rows[0].currval;
        })
        .catch(err => console.log(err));
    }
    let setString = ``;
    for (const key in incoming) {
      if (key !== "id") {
        if (setString.length === 0) {
          values.push(incoming[key]);
          setString += `${key} = $${values.length}`;
        } else {
          values.push(incoming[key]);
          setString += `, ${key} = $${values.length}`;
        }
      }
    }
    values.push(incomingID);
    setString += ` WHERE id = $${values.length}`;
    queryString = `UPDATE jobs SET ${setString}`;

    return db.query(queryString, values)
        .then((res) => {
          console.log("*******************");
          console.log("response for successfully saved job update")
          return incomingID;
        })
        .catch(err => console.log(err));
  });
  return router;
};
