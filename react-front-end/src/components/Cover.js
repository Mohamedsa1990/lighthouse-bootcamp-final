import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import splash from './splash.jpg'

const styling = {
  height: "100vw",
  width: "100vw",
  background: "#37474f",
};
const imgStyle = {
  height: "95vw",
  width: "95vw"
}

export default function JobCalendar(){

  return (
    <Box component="div" style={styling}>
      <img src={splash} alt="splash" style={imgStyle}/>;
    </Box>
  );
}