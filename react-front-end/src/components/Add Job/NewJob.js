import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { FormControl, Select, InputLabel, MenuItem} from '@material-ui/core'
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export default function NewJob({travelTime, setTravelTime, status, setStatus, jobname, setJobName, firstName, setFirstName, lastName, setLastName, address,setAddress
  , city, setCity,phoneNumber, setPhoneNumber, email, setEmail, notes, setNotes,errorState }) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="left">
        Job details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            error={errorState.nameError}
            helperText={''}
            id="Job name"
            name="Job name"
            label="Job name"
            fullWidth
            value={jobname}
            onChange={(event) => setJobName(event.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            errorText={errorState.customer_first_nameError}
            fullWidth
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            errorText={errorState.customer_last_nameError}
            fullWidth
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            errorText={errorState.customer_addressError}
            fullWidth
            value={address}
            onChange={e => setAddress(e.target.value)}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            errorText={errorState.customer_cityError}
            fullWidth
            value={city}
            onChange={e => setCity(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Phone number"
            name="Phone number"
            label="Phone number"
            errorText={errorState.customer_phone_numberError}
            fullWidth
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Email"
            name="email"
            label="email"
            errorText={errorState.customer_emailError}
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Status"
            name="status"
            label="status"
            fullWidth
            value={status}
            onChange={e => setStatus(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
          id="number"
          label="Estimated travel time"
          type="number"
          fullWidth
          value={travelTime}
          onChange={e => setTravelTime(parseFloat(e.target.value))}
        />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="standard-textarea"
            label="Notes"
            placeholder="Notes"
            multiline
            fullWidth
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}