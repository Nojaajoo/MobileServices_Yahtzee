import { View, Text } from 'react-native'
import React from 'react'
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from '../styles/Styles';

export default function Footer() {
  return (
    <Row size={1.5}>
        <Col style={styles.footer}>
                <Text>Footer</Text>
        </Col>
    </Row>
    

  )
}