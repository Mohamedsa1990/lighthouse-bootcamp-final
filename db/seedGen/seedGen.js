const fs = require('fs');



//insert into Skills (user_id, task_id, skill_level) values (36, 5, 6);
let addSkill = "";
let addRequirement = '';
let addAssignment = '';
let user = 0;
let task = 0;
let job = 0;
let skillLevel = '';
let skillLevels = ['Easy', 'Medium', 'Hard'];
let months = [11, 12, 1]
let days = {'11': 30, '12': 31, '1': 31}
let years = {'10': 2020, '11': 2020, '12': 2020, '1': 2021, '2': 2021, '3': 2021}
let skillData = '';
let assignmentsData = '';
let requirementsData = '';

const oldSkills = {};
const oldRequirements = {};
const oldAssignments = {};

while (Object.keys(oldAssignments).length < 100){
  console.log(Object.keys(oldAssignments).length)
  //Skill
  user = 0;
  task = 0;
  addSkill = "INSERT INTO skills (user_id, task_id, skill_level) values ("
  while ( user === 0 || (oldSkills[user] && oldSkills[user].includes(task))){
    user = Math.floor((Math.random() * 100) + 1);
    task = Math.floor((Math.random() * 15) + 1);
  }
  if (!oldSkills[user]) {
    oldSkills[user] = [];
  }
  oldSkills[user].push[task]
  skillLevel = Math.floor(Math.random() * 3) + 1;
  addSkill += `${user}, ${task}, ${skillLevel});\n`
  skillData += addSkill;
  console.log("End Skill")

  //Requirement
  addRequirement = "INSERT INTO requirements (job_id, task_id, difficulty, estimate_time, estimate_workers) values ("
  job = 0;
  while (job === 0 || (oldRequirements[job] && oldRequirements[job].includes(task))){
    job = Math.floor((Math.random() * 100) + 1);
  }
  if (!oldRequirements[job]) {
    oldRequirements[job] = [];
  }
  oldRequirements[job].push(task);
  let estimateTime = (Math.floor((Math.random() * 12) + 1));
  let estimateWorkers = Math.floor((Math.random() * 6) + 1);
  addRequirement += `${job}, ${task}, '${skillLevel}', ${estimateTime}, ${estimateWorkers});\n`
  requirementsData += addRequirement;

  console.log("End Requirement")
  //Assignment
  addAssignment = "INSERT INTO assignments (Job_id, user_id, starts, ends) values ("
  if (!oldAssignments[job]) {
    let month = months[Math.floor(Math.random() * 3)];
    let day = Math.floor((Math.random() * days[month]) + 1);
    let year = years[month];
    let startTemp = Math.floor((Math.random() * 10));
    let startsHour = startTemp + 7;
    let endsHour = startsHour + Math.floor((Math.random() * (12 - startTemp)));
    let startsMinutes = 15 * Math.floor((Math.random() * 4));
    let endsMinutes = 15 * Math.floor((Math.random() * 4));

    if (day < 10) day = `0${day}`;
    if (month < 10) month = `0${month}`;
    if (startsHour <10) startsHour = `0${startsHour}`;
    if (endsHour <10) endsHour = `0${endsHour}`;

    let starts = `${year}-${month}-${day}T${startsHour}:${startsMinutes}`;
    let ends = `${year}-${month}-${day}T${endsHour}:${endsMinutes}`;
    addAssignment += `${job}, ${user}, '${starts}', '${ends}');\n`;
    console.log("New",addAssignment)
    assignmentsData += addAssignment;
    oldAssignments[job] = {users: [user], starts, ends}
  } else if (!oldAssignments[job].users.includes(user)) {
    addAssignment += `${job}, ${user}, '${oldAssignments[job].starts}', '${oldAssignments[job].ends}');\n`
    console.log("Old",addAssignment)
    assignmentsData += addAssignment;
    oldAssignments[job].users.push(user);
  }
  console.log("End Assignment")
}

fs.writeFileSync("./05_Skills.sql", skillData, "utf8" )
fs.writeFileSync("./06_requirements.sql", requirementsData, "utf8" )
fs.writeFileSync("./04_Assignments.sql", assignmentsData, "utf8" )