import { Text } from 'react-native'
import React from 'react'
import { Row } from "react-native-easy-grid";
import Styles from '../styles/Styles';

export default function Footer() {
  return (
    <Row size={1.5} style={Styles.footer}>
      <Text style={Styles.footerText}>Joona Oja TIK20SP</Text>
    </Row>
  )
}