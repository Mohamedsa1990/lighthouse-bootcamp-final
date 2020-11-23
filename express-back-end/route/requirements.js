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
        .then((res) => {
          return db.query(`SELECT currval('requirements_id_seq')`);
        })
        .then((res2) => {
          console.log("*******************")
          console.log("response for successfully saved new requirement");
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
    queryString = `UPDATE requirements SET ${setString}`;

    return db.query(queryString, values)
        .then((res) => {
          console.log("*******************");
          console.log("response for successfully saved requirement update")
          return incomingID;
        })
        .catch(err => console.log(err));
  });
  router.delete('/:id', (req, res) => {
    return db.query(`DELETE FROM requirements WHERE id = $1`, [req.params.id])
      .then(res => res.row)
      .catch(err => console.log('delete error: ', err));
  })
  return router;
}