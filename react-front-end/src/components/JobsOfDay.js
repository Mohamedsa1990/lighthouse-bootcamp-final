import React from 'react';
import { Container, Box, Divider, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Header from './JobsOfDay_components/header';
import JobsNav from './JobsOfDay_components/jobsNav';
import RequirementsList from './JobsOfDay_components/requirementsList';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(60),
      height: theme.spacing(30),
    },
  },
}));

const jobsDataArray = [{
  assignments: [{
    admin: null,
    ends: "04/01/2020",
    estimate_hrs: 1020,
    first_name: "Hillyer",
    id: 49,
    job_id: 1,
    last_name: "Morrel",
    starts: "16/12/2020",
    user_id: 49
  }],
  calendarIDs: [],
  customer_address: "35 Straubel Street",
  customer_city: "Arcoverde",
  customer_email: "bnickoll6@wunderground.com",
  customer_first_name: "Bamby",
  customer_last_name: "Nickoll",
  customer_phone_number: "835-489-3765",
  estimate_total_time: 60,
  estimate_total_workers: 2,
  estimate_travel_time: 180,
  id: 11,
  name: "nunc viverra dapibus",
  notes: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.↵↵In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  requirements: [{
    description: "Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    difficulty: 10,
    estimate_time: 780,
    estimate_workers: 1,
    id: 7,
    job_id: 11,
    name: "decks",
    task_id: 7
  }],
  status: "Quote Requested"},

  {
  assignments: [],
  calendarIDs: [],
  customer_address: "35 Straubel Street",
  customer_city: "Arcoverde",
  customer_email: "bnickoll6@wunderground.com",
  customer_first_name: "Bamby",
  customer_last_name: "Nickoll",
  customer_phone_number: "835-489-3765",
  estimate_total_time: 80,
  estimate_total_workers: 4,
  estimate_travel_time: 180,
  id: 11,
  name: "nunc viverra dapibus",
  notes: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.↵↵In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
  requirements: [{
    description: "Sed ante.",
    difficulty: 7,
    estimate_time: 840,
    estimate_workers: 1,
    id: 3,
    job_id: 5,
    name: "maintaining flowers and plants",
    task_id: 3
  }],
  status: "Quote Requested"},

  {
    assignments: [],
    calendarIDs: [],
    customer_address: "35 Straubel Street",
    customer_city: "Arcoverde",
    customer_email: "bnickoll6@wunderground.com",
    customer_first_name: "Bamby",
    customer_last_name: "Nickoll",
    customer_phone_number: "835-489-3765",
    estimate_total_time: 1110,
    estimate_total_workers: 5,
    estimate_travel_time: 180,
    id: 11,
    name: "nunc viverra dapibus",
    notes: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.↵↵In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    requirements: [],
    status: "Quote Requested"
  }
];

export default function JobOfDay(props) {
  const classes = useStyles();
  
  return (
      <Container >
        <Paper elevation={4} >
          <Header />
          <List 
            aria-labelledby="nested-list-subheader"
          >
            {jobsDataArray.map((obj, index) => {
              return (
                <Paper variant="outlined">
                    <ListItem>
                      <Box>
                        <JobsNav jobObj={obj} id={index}/>
                        <RequirementsList jobObj={obj}/>
                        <Divider />
                      </Box>
                    </ListItem>
                </Paper>
              )         
            })} 
          </List>
        </Paper>
      </Container>  
    
  )
}