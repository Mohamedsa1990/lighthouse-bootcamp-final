const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.put('/:id', (req, res) => {
    console.log("******************************");
    console.log("request to save requirement received");
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
      queryString = `INSERT INTO requirements (${keysString}) VALUES (${variableString})`;
      return db.query(queryString, values)
        .then((data) => {
          return db.query(`SELECT currval('requirements_id_seq')`);
        })
        .then((data2) => {
          let id = data2.rows[0].currval
          return db.query(`SELECT
            requirements.id AS id,
            job_id,
            task_id,
            difficulty,
            estimate_time,
            estimate_workers,
            name,
            description
          FROM requirements JOIN tasks ON task_id = tasks.id WHERE requirements.id = $1`, [id]);
        })
        .then((data3) => {
          console.log("*******************")
          console.log("response for successfully saved new requirement");
          console.log(incoming);
          console.log(data3.rows[0]);
          return res.json(data3.rows[0]);
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
    queryString = `UPDATE requirements SET ${setString}`;

    return db.query(queryString, values)
      .then((data) => {
        return db.query(`SELECT
          requirements.id AS id,
          job_id,
          task_id,
          difficulty,
          estimate_time,
          estimate_workers,
          name,
          description
        FROM requirements JOIN tasks ON task_id = tasks.id WHERE requirements.id = $1`, [incomingID]);
      })
      .then((data3) => {
        console.log("*******************")
        console.log("response for successfully saved requirement update");
        return res.json(data3.rows[0]);
      })
      .catch(err => console.log(err));
  });
  router.delete('/:id', (req, res) => {
    return db.query(`DELETE FROM requirements WHERE id = $1`, [req.params.id])
      .then(data => res.json(data.row))
      .catch(err => console.log('delete error: ', err));
  })
  return router;
}
