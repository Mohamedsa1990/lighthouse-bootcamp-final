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


export default function AddJob({tasks, users}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const [jobName, setJobName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [totalWorker, setTotalWorker] = useState();
  const [totalTime, setTotalTime] = useState();
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('')
  const [travelTime, setTravelTime] = useState('')
  

  const [requirements, setRequirements] = useState([]);

  const [checkedEmployee, setCheckedEmployee] = useState([]);
  
  const job = {jobName, firstName, lastName, address, city, phoneNumber, email, notes,status,travelTime, totalTime, totalWorker};

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <NewJob 
                jobName = {jobName} 
                setJobName = {setJobName} 
                firstName = {firstName} 
                setFirstName= {setFirstName}
                lastName= {lastName}
                setLastName = {setLastName}
                address = {address}
                setAddress = {setAddress}
                city = {city} 
                setCity = {setCity}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                email = {email} 
                setEmail = {setEmail}
                notes={notes}
                setNotes={setNotes}
                status={status}
                setStatus={setStatus}
                travelTime={travelTime}
                setTravelTime={setTravelTime}
                />
      case 1:
        return <Requirements 
                tasks={tasks} 
                requirements={requirements} 
                setRequirements={setRequirements}
                totalTime={totalTime}
                setTotalTime={setTotalTime}
                totalWorker={totalWorker}
                setTotalWorker={setTotalWorker}
                />
      case 2:
        return <AssignWorker 
                users={users} 
                start = {start}
                setStart = {setStart}
                end = {end} 
                setEnd = {setEnd}
                requirements={requirements} 
                checkedEmployee={checkedEmployee} 
                setCheckedEmployee={setCheckedEmployee}
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
                {console.log('job', job)}
                {console.log('requirements', requirements)}
                {/* {setCheckedEmployee([...checkedEmployee, start, end])} */}
                {console.log('assignments', checkedEmployee)}
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