import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './styles/Styles';
import Header from './components/Header';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function App() {
  return (
    <Grid>
      <Col style={styles.container}>
        <StatusBar style='auto' backgroundColor='orange' />
        <Header />
        <Gameboard />
        <Footer />
      </Col>
    </Grid>
  );
}
