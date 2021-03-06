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
        return db.query(`SELECT
            requirements.id AS id,
            job_id,
            task_id,
            difficulty,
            estimate_time,
            estimate_workers,
            name,
            description
          FROM requirements JOIN tasks ON task_id = tasks.id`);
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
        return db.query(`SELECT 
            assignments.id AS id,
            job_id,
            user_id,
            starts,
            ends,
            first_name,
            last_name,
            admin
          FROM assignments JOIN users ON user_id = users.id`);
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
        return res.json(output);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err)
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
        .then((data) => {
          return db.query(`SELECT currval('jobs_id_seq')`);
        })
        .then((data2) => {
          console.log("*******************")
          console.log("response for successfully saved new job");
          return res.json(data2.rows[0].currval);
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json(err)
        });
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
        .then((data) => {
          console.log("*******************");
          console.log("response for successfully saved job update")
          return res.json(incomingID);
        })
        .catch(err => {
          console.log(err);
          return res.status(500).json(err)
        });
  });

  router.delete('/:id', (req, res) => {
    console.log("request to delete", req.params.id)
    return db.query(`DELETE FROM jobs WHERE id = $1`, [req.params.id])
      .then(data => {
        console.log("**** deleted ", req.params.id)
        return res.json(data.row);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err)
      });
  })
  return router;
};
