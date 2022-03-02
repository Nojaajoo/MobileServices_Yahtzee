import { Text } from 'react-native'
import React from 'react'
import { Row } from "react-native-easy-grid";
import Styles from '../styles/Styles';

export default function Header() {
  return (
        <Row size={1} style={Styles.header}>
          <Text style={Styles.headerText}>Mini-Yahtzee!</Text>
        </Row>
  )
}