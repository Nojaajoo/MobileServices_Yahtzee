import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from '../styles/Styles';

const POINT_SLOTS = 6;
const DICES = 5;
const THROWS = 3;
let board = [];


export default function Gameboard() {

const [throwsLeft, setThrowsLeft] = useState(THROWS);
const [status, setStatus] = useState('');
const [selectedDices, setSelectedDices] =
    useState(new Array(DICES).fill(false));
const [selectedPoints, setSelectedPoints] =
    useState(new Array(DICES).fill(false));

// const [selectedPoints, setSelectedPoints] =
//     useState(slots);

let slots = [];
for (let i = 0; i < POINT_SLOTS; i++) {
    slots.push([
        {
            "slot_id": "points" + i,
            "selected": false,
            "locked": false,
            "value": 0
        }
    ])
}

// FUNCTION: THROW DICE
const throwDice = () => {
    console.log(slots);
    for (let i = 0; i < DICES; i++) {
        if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1 );
            board[i] = 'dice-' + randomNumber;
        }
    }
    setThrowsLeft(throwsLeft - 1 )
}

// FUNCTION: SELECT DICE TO KEEP
const selectDice = (i) => {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
}

// FUNCTION: SET COLOR OF SELECTED DICE
const getDiceColor = (i) => {
    return selectedDices[i] ? "red" : "black";
}

// FUNCTION: SELECT POINTS TO KEEP
const selectPoints = (i) => {
    let points = [...selectedPoints];
    points[i] = selectedPoints[i] ? false : true;
    setSelectedPoints(points);
}

// FUNCTION: SET SELECTED POINTS CATEGORY COLOR
const getPointsColor = (i) => {
    return selectedPoints[i] ? "red" : "black";
}

// dice row/board
const row = [];
for (let i = 0; i < DICES; i++) {
    row.push(
        <Col>
            <Pressable
            key={"row" + i}
            onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                name={board[i]}
                key={"row" + 1}
                size={60}
                color={getDiceColor(i)}
                />
            </Pressable>
        </Col>
    );
}

// point slot buttons - WIP: points readout, changing of color and icon style based on selection
const points = [];
for (let i = 0; i < POINT_SLOTS; i++) {
    points.push(
        <Col style={Styles.pointSlot}>
            <Text style={Styles.pointSlotText}>0</Text>
            <Pressable
            key={"points" + i} 
            onPress={() => selectPoints(i)}>
                <MaterialCommunityIcons
                name={"numeric-" + [i + 1] + "-box-multiple-outline"}
                key={"points" + i}
                size={40}
                color={getPointsColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        </Col>
    )
}

  return (
      <Row size={10}>
        <Col>
            <Row size={2}><Col/>{row}<Col/></Row>
            <Row><Text>Throws Left: {throwsLeft}</Text></Row>
            <Row><Text>Game Status Message</Text></Row>
            <Row size={2} style={Styles.row}>
                <Pressable
                style={Styles.button}
                onPress={() => throwDice()}>
                    <Text style={Styles.buttonText}>Throw dice</Text>
                </Pressable>
            </Row>
            <Row><Text>Total:</Text></Row>
            <Row><Text>points info message</Text></Row>
            <Row size={2}><Col/>{points}<Col/></Row>
        </Col>
      </Row>
  )
}