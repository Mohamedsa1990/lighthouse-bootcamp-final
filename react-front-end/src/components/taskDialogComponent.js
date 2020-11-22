import React from 'react'
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Select, InputLabel, MenuItem, TextField, Button } from '@material-ui/core';

export default function TaskDialogComponent (props) {
  return (
    <Dialog open={props.open} onClose={props.handleClose} style={{minWidth: '60vw'}}>
      <DialogTitle>
        Add task
      </DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item >
            <FormControl fullWidth variant="outlined">
              <InputLabel id="Task">Task</InputLabel>
              <Select
                label="Task"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="Difficulty">Difficulty</InputLabel>
              <Select
                label="Difficulty"
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
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id="outlined-number"
              label="Time in minutes"
              type="number"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={props.handleClose}>Cancel</Button>
        <Button color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  )

}