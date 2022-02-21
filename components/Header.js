import { View, Text } from 'react-native'
import React from 'react'
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../styles/Styles';

export default function Header() {
  return (
        <Row size={1}>
        <Col style={styles.header}>
            <Text>Header</Text>
        </Col>
        </Row>
        
    
  )
}