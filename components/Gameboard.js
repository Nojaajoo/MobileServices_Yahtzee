import { View, Text, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Styles from '../styles/Styles';


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
            locked: true,
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
    const [gameStarted, setGameStarted] = useState(false);

// const [selectedPoints, setSelectedPoints] =
//     useState(new Array(POINTS).fill(false));

useEffect(() => {
    if (gameStarted === false) {
        setStatus("Game has not started");
    }
    if (throwsLeft == 0) {
        let dices = [...selectedDices];
        dices.fill(false);
        setSelectedDices(dices);
        setStatus("Select points to keep.")
    }
    if (throwsLeft < 0) {
        setThrowsLeft(THROWS - 1);
    }
}, [throwsLeft]);


// FUNCTION: get the index of slots object
const getIndex = (i) => {
    let index = selectedPoints.findIndex((item => item.id == i));
    return index;
}

// FUNCTION: THROW DICE
const throwDice = () => {

    for (let i = 0; i < DICES; i++) {
        if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1 );
            board[i] = 'dice-' + randomNumber;
        }
    }
    setGameStarted(true);
    setStatus("Keep playing");
    setThrowsLeft(throwsLeft - 1 )
    console.log(selectedPoints);
    // console.log(board);
}

// FUNCTION: SELECT DICE TO KEEP
const selectDice = (i) => {
    if (throwsLeft == 0) {
        setStatus("Select points to keep before next round!");
        return;
    } else if (throwsLeft == 3) {
        setStatus("Throws the first throw before keeping dice!");
        return;
    }
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
}

// FUNCTION: SET COLOR OF SELECTED DICE
const getDiceColor = (i) => {
    return selectedDices[i] ? "black" : "red";
}

// FUNCTION: SELECT POINTS TO KEEP
const selectPoints = (i) => {
    if (throwsLeft > 0) {
        setStatus("Throw your dice first!");
        return;
    }
    let points = [...selectedPoints];
    // points[i] = selectedPoints[i] ? false : true;
    // setSelectedPoints(points);
    let index = getIndex(i);
    if (points[index]["selected"] == true) {
        return;
    } else {
        points[index]["selected"] = true;
        setSelectedPoints(points);
        setThrowsLeft(THROWS);
        setStatus("Begin the next round");
        // throwDice();
    }
}

const getIcon = (i) => {
    let index = getIndex(i);
    let iconToReturn = selectedPoints[index]["icon"];
    return iconToReturn;
}

// FUNCTION: SET SELECTED POINTS CATEGORY COLOR
const getPointsColor = (i) => {
    //  return selectedPoints[i] ? "red" : "black";
    let index = getIndex(i);
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
            <Row><Text>Game status: {status}</Text></Row>
            <Row size={2} style={Styles.row}>
                <Pressable
                style={Styles.button}
                disabled={throwsLeft == 0 ? true : false}
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