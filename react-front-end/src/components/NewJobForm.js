import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();

  return (
    <>
      <h3>New Job</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField required id="standard-basic" label="Job Name" />
        <TextField required id="standard-basic" label="Customer First Name" />
        <TextField required id="standard-basic" label="Customer Last Name" />
        <TextField required id="standard-basic" label="Customer Address" />
        <TextField required id="standard-basic" label="Customer City" />
        <TextField required id="standard-basic" label="Customer Phone Number" />
        <TextField required id="standard-basic" label="Customer Email" />
      </form>
    </>
  );
}