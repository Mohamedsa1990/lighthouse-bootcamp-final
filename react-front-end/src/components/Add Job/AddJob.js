import React, { useState } from 'react';
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




const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Job details', 'Requirement details', 'Assign employees'];


export default function AddJob({tasks, users, addChangeAssignment, addChangeRequirement, cancelRequirement, addChangeJob, cancelJob}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const [name, setname] = useState('');
  const [customer_first_name, setCustomer_first_name] = useState('');
  const [customer_last_name, setCustomer_last_name] = useState('');
  const [customer_address, setCustomer_address] = useState('');
  const [customer_city, setCustomer_city] = useState('');
  const [customer_phone_number, setCustomer_phone_number] = useState('');
  const [customer_email, setCustomer_email] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [estimate_total_workers, setEstimate_total_workers] = useState();
  const [estimate_total_time, setEstimate_total_time] = useState();
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('')
  const [estimate_travel_time, setEstimate_travel_time] = useState('')
  

  const [requirements, setRequirements] = useState([]);

  const [assignments, setAssignments] = useState([]);
  
  const job = {
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

    // addChangeJob({
    //   name: 'total Junk',
    //   notes: 'you do not want to know',
    //   status: 'Quote Requested',
    //   estimate_total_time: 15,
    //   estimate_total_workers: 25,
    //   estimate_travel_time: 45,
    //   customer_first_name: 'Jackie',
    //   customer_last_name: 'Verecker',
    //   customer_address: '8607 Meadow Vale Avenue',
    //   customer_city: 'Zlataritsa',
    //   customer_phone_number: '994-624-0020',
    //   customer_email: 'jverecker1q@imageshack.us',
    // })
    // addChangeRequirement({
    //   job_id: 5,
    //   task_id: 5,
    //   difficulty: 5,
    //   estimate_time: 50,
    //   estimate_workers: 5,
    // })
    // addChangeAssignment({
    //   job_id: 5,
    //   user_id: 49,
    //   starts: '2015-03-25T12:00:00-06:30',
    //   ends: '2020-24-16T13:00:00-06:00',
    //   estimate_hrs: 4, 
    // })

  const handleNext = () => {
    if (activeStep === 0) {
      console.log(job)
    }
    if(activeStep === 1) {
      console.log(requirements)
    }
    setActiveStep(activeStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <NewJob 
                jobName = {name} 
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
                />
    default:
      throw new Error('Unknown step');
    }
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            New Job
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                {/* {console.log('job', job)}
                {console.log('requirements', requirements)}
                {setCheckedEmployee([...checkedEmployee, start, end])}
                {console.log('assignments', checkedEmployee)} */}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Save Job' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}