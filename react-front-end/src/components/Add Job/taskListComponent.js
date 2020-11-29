import {Grid} from '@material-ui/core';
import TaskComponent from './taskComponent'



export default function TaskListComponent (props) {
  const requirements = props.requirements.map(requirement => {
    return (
      <Grid item key={requirement.task_id}>
        <TaskComponent
        requirement={requirement}
        tasks={props.tasks}
        delete={props.delete}
        />
      </Grid>  
    );
  });
  return requirements;
};