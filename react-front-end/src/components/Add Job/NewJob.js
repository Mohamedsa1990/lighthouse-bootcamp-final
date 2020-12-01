import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  
  container: {
    height: "62vh",
  }
});
export default function NewJob({travelTime, setTravelTime, status, setStatus, name, setJobName, firstName, setFirstName, lastName, setLastName, address,setAddress
  , city, setCity,phoneNumber, setPhoneNumber, email, setEmail, notes, setNotes}) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
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
            value={name}
            onChange={(event) => setJobName(event.target.value)}
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
            name="email"
            label="email"
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
          onChange={e => {if (e.target.value >= 0) setTravelTime(parseFloat(e.target.value))}}
        />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="standard-textarea"
            label="Notes"
            placeholder="Notes"
            multiline
            rowsMax={2}
            fullWidth
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </Grid>
      </Grid>
    </div>
  );
}