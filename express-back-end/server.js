// load .env data into process.env
require("dotenv").config();


// Web server config
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const ENV = process.env.ENV || "development";

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();




// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));


// test route
const getUsers = require("./route/getUsers")
const jobs = require("./route/jobs")
const assignments = require("./route/assignments")
const requirements = require("./route/requirements")

const getTasks = require("./route/getTasks")
// routes
App.use("/api/jobs", jobs(db));
App.use("/api/assignments", assignments(db));
App.use("/api/requirements", requirements(db));




App.use("/api/users", getUsers(db));
App.use("/api/tasks", getTasks(db));

App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
