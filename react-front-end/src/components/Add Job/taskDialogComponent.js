import React from 'react'
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Select, InputLabel, MenuItem, TextField, Button } from '@material-ui/core';

export default function TaskDialogComponent (props) {
  
  return (
    <Dialog open={props.open} onClose={props.handleClose} style={{minWidth: '60vw'}} >
      <form onSubmit={props.formik.handleSubmit}>
        <DialogTitle>
          Add task
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item >
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="Name">Name</InputLabel>
                <Select
                  label="Name"
                  name="name"
                  onChange={props.formik.handleChange}
                  value={props.formik.values.name}
                >
                  <MenuItem value={"Low"}>Low</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="Difficulty">Difficulty</InputLabel>
                <Select
                  label="Difficulty"
                  name="difficulty"
                  onChange={props.formik.handleChange}
                  value={props.formik.values.difficulty}
                  >
                  <MenuItem value={"Low"}>Low</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
              fullWidth
              id="outlined-number"
              label="Worker"
              type="number"
              variant="outlined"
              name="worker"
              onChange={props.formik.handleChange}
              value={props.formik.values.worker}
              />
            </Grid>
            <Grid item>
              <TextField
              fullWidth
              id="time"
              label="Estimated time"
              type="time"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 1800, // 30 min
              }}
              name="time"
              onChange={props.formik.handleChange}
              value={props.formik.values.time}
              />
            </Grid>
            <Grid item>
              <TextField
              fullWidth
              id="outlined-basic"
              label="Discription"
              variant="outlined"
              name="description"
              onChange={props.formik.handleChange}
              value={props.formik.values.discription}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">Cancel</Button>
          <Button onClick={props.formik.handleSubmit} color="primary">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
