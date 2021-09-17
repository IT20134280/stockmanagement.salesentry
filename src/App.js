import logo from './logo.svg';
import './App.css';
import { Container, Typography } from "@material-ui/core";
import Order from './components/SalesEntry';
 

function App() {
  return (
    <Container maxWidth="md">
      <Typography
      gutterBottom
      variant="h2"
      align="center">
        Sales Entry
      </Typography>
      <Order />
    </Container>
  );
}

export default App;
