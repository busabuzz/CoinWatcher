import './App.css';
import Sidebar from './components/Sidebar';
import CoinDashboard from './components/CoinDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container"

function App() {
  console.log("app");
  return (
    <Container>
      <Sidebar/>
      <CoinDashboard/>
    </Container>
  );
}

export default App;
