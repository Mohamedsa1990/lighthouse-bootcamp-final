import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Requirements from './Requirements';
import NewJob from './NewJob';
import AssignWorker from './AssignWorker';




const useStyles = makeStyles({
  appBar: {
    position: 'relative',
  },
  paper: {
    marginTop: 20,
    marginBottom: 20,
    marginRight:10,
    marginLeft:10,
    padding: 20,
    height: "82vh",
  },
  stepper: {
    stepIcon: 'green',
    color: "#80B98B",
    // padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: 20,
    marginLeft: 10,
  },
});

const steps = ['Job details', 'Requirement details', 'Assign employees'];


export default function AddJob({tasks, users, addChangeAssignment, addChangeRequirement, addChangeJob, cancelJob, onAllJobs, jobInfo, newJob, setNewJob, cancelAssignment, cancelRequirement}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const modifiedReq = [];
  jobInfo.requirements.forEach(req =>  modifiedReq.push({id:req.id, job_id: req.job_id, task_id:req.task_id, difficulty: req.difficulty , estimate_workers: req.estimate_workers, estimate_time: req.estimate_time}));
  const modifiedAssignments = [];
  jobInfo.assignments.forEach(assignment => modifiedAssignments.push({id:assignment.id, job_id: assignment.job_id,user_id:assignment.user_id, starts: assignment.starts, ends:assignment.ends}))
  

  const [name, setname] = useState(newJob ? '' : jobInfo.name);
  const [customer_first_name, setCustomer_first_name] = useState(newJob ? '' :jobInfo.customer_first_name);
  const [customer_last_name, setCustomer_last_name] = useState(newJob ? '' :jobInfo.customer_last_name);
  const [customer_address, setCustomer_address] = useState(newJob ? '' :jobInfo.customer_address);
  const [customer_city, setCustomer_city] = useState(newJob ? '' :jobInfo.customer_city);
  const [customer_phone_number, setCustomer_phone_number] = useState(newJob ? '' :jobInfo.customer_phone_number);
  const [customer_email, setCustomer_email] = useState(newJob ? '' :jobInfo.customer_email);
  const [start, setStart] = useState((newJob || jobInfo.assignments.length === 0) ? '' :jobInfo.assignments[0].starts);
  const [end, setEnd] = useState((newJob || jobInfo.assignments.length === 0) ? '' :jobInfo.assignments[0].ends);
  const [estimate_total_workers, setEstimate_total_workers] = useState(newJob ? 0 :jobInfo.estimate_total_workers);
  const [estimate_total_time, setEstimate_total_time] = useState(newJob ? 0 :jobInfo.estimate_total_time);
  const [notes, setNotes] = useState(newJob ? '' :jobInfo.notes)
  const [status, setStatus] = useState(newJob ? '' :jobInfo.status)
  const [estimate_travel_time, setEstimate_travel_time] = useState(newJob ? undefined :jobInfo.estimate_travel_time)

  const [requirements, setRequirements] = useState(newJob ? [] : modifiedReq);
  const [jobId, setJobId] = useState(newJob ? 0 :jobInfo.id)
  const [assignments, setAssignments] = useState(newJob ? [] : modifiedAssignments);
  const job = {
    id: jobId,
    name,
    notes, 
    status, 
    estimate_total_time, 
    estimate_total_workers, 
    estimate_travel_time, 
    customer_first_name, 
    customer_last_name,
    customer_address,
    customer_city, 
    customer_phone_number, 
    customer_email};

  const handleNext = () => {
    if (activeStep === 0 && newJob) {
      addChangeJob(job)
        .then(data => {
          setJobId(data)
          setActiveStep(activeStep + 1);
      })
    } else {
      setActiveStep(activeStep + 1);
    }
  };
  
  const handleBack = () => {
    if (activeStep === 1 && newJob) {
      cancelJob(jobId)
    }
    
    setActiveStep(activeStep - 1);
  };


  const onSubmit = () => {
    addChangeJob(job);
    requirements.forEach(requirement => addChangeRequirement(requirement));
    assignments.forEach(assignment => addChangeAssignment(assignment));
    
    onAllJobs(setNewJob(true));
  };

  const onCancel = () => {
    setNewJob(true);
    onAllJobs();
  }
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <NewJob 
                name = {name} 
                setJobName = {setname} 
                firstName = {customer_first_name} 
                setFirstName= {setCustomer_first_name}
                lastName= {customer_last_name}
                setLastName = {setCustomer_last_name}
                address = {customer_address}
                setAddress = {setCustomer_address}
                city = {customer_city} 
                setCity = {setCustomer_city}
                phoneNumber={customer_phone_number}
                setPhoneNumber={setCustomer_phone_number}
                email = {customer_email} 
                setEmail = {setCustomer_email}
                notes={notes}
                setNotes={setNotes}
                status={status}
                setStatus={setStatus}
                travelTime={estimate_travel_time}
                setTravelTime={setEstimate_travel_time}
                />
      case 1:
        return <Requirements 
                tasks={tasks} 
                requirements={requirements} 
                setRequirements={setRequirements}
                totalTime={estimate_total_time}
                setTotalTime={setEstimate_total_time}
                totalWorker={estimate_total_workers}
                setTotalWorker={setEstimate_total_workers}
                jobId={jobId}
                cancelRequirement={cancelRequirement}
                newJob={newJob}
                />
      case 2:
        return <AssignWorker 
                users={users} 
                start = {start}
                setStart = {setStart}
                end = {end} 
                setEnd = {setEnd}
                requirements={requirements} 
                assignments={assignments} 
                setAssignments={setAssignments}
                jobId={jobId}
                cancelAssignment={cancelAssignment}
                newJob={newJob}
                />
    default:
      throw new Error('Unknown step');
    }
  }

  return (
    <>
      <main>
        <Paper className={classes.paper} elevation={3}>
          <Typography component="h1" variant="h4" align="center">
            {newJob ? "New Job" : "Edit Job"}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.root} >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                {/* Use this as condition of going back to the normal view*/}
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep === 0 ?
                  (
                    <Button onClick={onCancel} className={classes.button}>
                      Cancel
                    </Button>
                  )
                  :
                  (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {
                    activeStep === steps.length - 1 ?
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={onSubmit}
                    className={classes.button}
                  >Save Job
                  </Button> : <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  >Next</Button>
                  }
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </>
  );
}