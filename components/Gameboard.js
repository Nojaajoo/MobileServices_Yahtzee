import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from '../styles/Styles';

// point slot buttons - WIP: points readout, changing of color and icon style based on selection
const POINT_SLOTS = 6;
const points = [];
for (let i = 0; i < POINT_SLOTS; i++) {
    points.push(
        <Col style={Styles.pointSlot}>
            <Text style={Styles.pointSlotText}>0</Text>
            <Pressable
            key={"points" + i} >
                <MaterialCommunityIcons
                name={"numeric-" + [i + 1] + "-box-multiple-outline"}
                key={"points" + i}
                size={40}
                color={"red"}>
                </MaterialCommunityIcons>
            </Pressable>
        </Col>
    )
}

export default function Gameboard() {
  return (
      <Row size={10}>
        <Col>
            <Row size={2}><Text>dice go here</Text></Row>
            <Row><Text>Throws Left:</Text></Row>
            <Row><Text>Game Status Message</Text></Row>
            <Row size={2}>
                <Pressable>
                    <Text>Throw dice</Text>
                </Pressable>
            </Row>
            <Row><Text>Total:</Text></Row>
            <Row><Text>points info message</Text></Row>
            <Row size={2}><Col/>{points}<Col/></Row>
        </Col>
      </Row>
  )
}