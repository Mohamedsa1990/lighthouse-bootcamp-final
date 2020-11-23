import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';



export default function NewJob({jobname, setJobName, firstName, setFirstName, lastName, setLastName, address,setAddress
  , city, setCity,phoneNumber, setPhoneNumber, Email, setEmail, start, setStart, end, setEnd }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="left">
        Job details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="Job name"
            name="Job name"
            label="Job name"
            fullWidth
            value={jobname}
            onChange={e => setJobName(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
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
            fullWidth
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Email"
            name="Email"
            label="Email"
            fullWidth
            value={Email}
            onChange={e => setEmail(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="datetime-local"
            label="Start"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={start}
            onChange={e => setStart(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="datetime-local"
            label="End"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={end}
            onChange={e => setEnd(e.target.value)}
            />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}