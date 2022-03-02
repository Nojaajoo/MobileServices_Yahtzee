// Joona Oja TIK20SP
import { StatusBar } from 'expo-status-bar';
import Styles from './styles/Styles';
import Header from './components/Header';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';
import { Col, Grid } from "react-native-easy-grid";

export default function App() {
  return (
    <Grid style={Styles.container}>
      <Col>
        <StatusBar style='auto' backgroundColor='orange' />
        <Header />
        <Gameboard />
        <Footer />
      </Col>
    </Grid>
  );
}

