const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.put('/:id', (req, res) => {
    console.log("******************************");
    console.log("request to save assignment received");
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
      queryString = `INSERT INTO assignments (${keysString}) VALUES (${variableString})`;

      return db.query(queryString, values)
        .then((data) => {
          return db.query(`SELECT currval('assignments_id_seq')`);
        })
        .then((data2) => {
          let id = data2.rows[0].currval
          return db.query(`SELECT 
            assignments.id AS id,
            job_id,
            user_id,
            starts,
            ends,
            first_name,
            last_name,
            admin
          FROM assignments JOIN users ON user_id = users.id WHERE assignments.id = $1`, [id]);
        })
        .then((data3) => {
          console.log("*******************")
          console.log("response for successfully saved new assignment");
          console.log(incoming);
          console.log(data3.rows[0]);
          return res.json(data3.rows[0]);
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
    queryString = `UPDATE assignments SET ${setString}`;

    return db.query(queryString, values)
      .then((data) => {
        return db.query(`SELECT 
          assignments.id AS id,
          job_id,
          user_id,
          starts,
          ends,
          first_name,
          last_name,
          admin
        FROM assignments JOIN users ON user_id = users.id WHERE assignments.id = $1`, [incomingID]);
      })
      .then((data3) => {
        console.log("*******************")
        console.log("response for successfully saved assignment update");
        return res.json(data3.rows[0]);
      })
      .catch(err => {
        console.log(err);
        return res.status(500).json(err)
      });
  });
  router.delete('/:id', (req, res) => {
    return db.query(`DELETE FROM assignments WHERE id = $1`, [req.params.id])
      .then(data => res.json(data.row))
      .catch(err => {
        console.log(err);
        return res.status(500).json(err)
      });
  })
  return router;
}