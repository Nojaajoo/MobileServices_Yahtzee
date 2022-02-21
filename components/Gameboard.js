import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from '../styles/Styles';


const POINT_SLOTS = 6;

const points = [];
for (let i = 0; i < POINT_SLOTS; i++) {
    points.push(
        <Col style={Styles.pointSlot}>
            <Text>0</Text>
            <Pressable
            key={"points" + i} >
                <MaterialCommunityIcons
                name={"numeric-" + [i + 1] + "-box-multiple-outline"}
                key={"points" + i}
                size={50}
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
          <Row>{points}</Row>
        </Col>
      </Row>
  )
}