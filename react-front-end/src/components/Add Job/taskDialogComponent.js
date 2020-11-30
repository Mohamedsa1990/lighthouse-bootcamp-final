import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, Select, InputLabel, MenuItem, TextField, Button } from '@material-ui/core';


export default function TaskDialogComponent (props) {
  const disableAdd = (props.formik.values.task_id === "" || props.formik.values.difficulty === "")
  return (
    <Dialog open={props.open} onClose={props.handleClose} style={{minWidth: '100vw'}} >
      <form onSubmit={props.formik.handleSubmit}>
        <DialogTitle>
          Add task
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item >
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="Name">Task name</InputLabel>
                <Select
                  required
                  label="Name"
                  name="task_id"
                  onChange={props.formik.handleChange}
                  value={props.formik.values.task_id}
                >
                  {props.tasks.map(task => {
                    return (
                      <MenuItem key={task.id} value={task.id}>{task.name}</MenuItem>
                    )
                  })}
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
                  <MenuItem value={"Easy"}>Easy</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"Hard"}>Hard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <TextField
              fullWidth
              id="Worker"
              label="Worker"
              type="number"
              variant="outlined"
              name="estimate_workers"
              onChange={e => {if (e.target.value > 0) props.formik.handleChange(e)}}
              value={props.formik.values.estimate_workers}
              />
            </Grid>
            <Grid item>
              <TextField
              fullWidth
              id="time"
              label="Estimated time hrs"
              type="number"
              variant="outlined"
              name="estimate_time"
              onChange={e => {if (e.target.value >= 0) props.formik.handleChange(e)}}
              value={props.formik.values.estimate_time}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">Cancel</Button>
          <Button onClick={props.formik.handleSubmit} disabled={disableAdd} color="primary">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
