import { View, Text } from 'react-native'
import React from 'react'
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../styles/Styles';
import Styles from '../styles/Styles';

export default function Header() {
  return (
        <Row size={1} style={Styles.header}>
          {/* <Col style={styles.header}> */}
              <Text style={styles.headerText}>Mini-Yahtzee!</Text>
          {/* </Col> */}
        </Row>
        
    
  )
}