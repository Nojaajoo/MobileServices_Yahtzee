import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from '../styles/Styles';
import { getApplication } from 'react-native-web/dist/cjs/exports/AppRegistry/renderApplication';

const POINT_SLOTS = 6;
const DICES = 5;
const THROWS = 3;
let board = [];

let slots = [];
for (let i = 0; i < POINT_SLOTS; i++) {
    slots.push(
        {
            id: i,
            selected: false,
            locked: false,
            value: i+1,
            sum: 0,
            icon: "numeric-" + [i + 1] + "-box-multiple-outline"
        }
    )
}


export default function Gameboard() {

const [throwsLeft, setThrowsLeft] = useState(THROWS);
const [status, setStatus] = useState('');
const [selectedDices, setSelectedDices] =
    useState(new Array(DICES).fill(false));
const [selectedPoints, setSelectedPoints] =
    useState(slots);

// const [selectedPoints, setSelectedPoints] =
//     useState(new Array(POINTS).fill(false));



// FUNCTION: THROW DICE
const throwDice = () => {
    
    for (let i = 0; i < DICES; i++) {
        if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1 );
            board[i] = 'dice-' + randomNumber;
        }
    }
    setThrowsLeft(throwsLeft - 1 )
    console.log(selectedPoints);
    // console.log(board);
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
    // points[i] = selectedPoints[i] ? false : true;
    // setSelectedPoints(points);
    let index = points.findIndex((item => item.id == i));
    if (points[index]["selected"] == true) {
        return;
    } else {
        points[index]["selected"] = true;
        setSelectedPoints(points);
    }
}

const getIcon = (i) => {
    let index = selectedPoints.findIndex((item => item.id == i));
    let iconToReturn = selectedPoints[index]["icon"];
    return iconToReturn;
}

// FUNCTION: SET SELECTED POINTS CATEGORY COLOR
const getPointsColor = (i) => {
    //  return selectedPoints[i] ? "red" : "black";
    let index = selectedPoints.findIndex((item => item.id == i));
    if (selectedPoints[index]["selected"] === true) {
        return "black";
    } else {
        return "red";
    }
    // console.log(objIndex);
}

// dice row/board
const row = [];
for (let i = 0; i < DICES; i++) {
    row.push(
        <Col key={"row" + i}>
            <Pressable
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
for (let i = 0; i < slots.length; i++) {
    points.push(
        <Col style={Styles.pointSlot}  key={"points" + i}>
            <Text style={Styles.pointSlotText}>0</Text>
            <Pressable
            onPress={() => selectPoints(i)}>
                <MaterialCommunityIcons
                //name={"numeric-" + [i + 1] + "-box-multiple-outline"}
                name={getIcon(i)}
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