import { Text, Pressable } from 'react-native';
import React, { useState, useEffect, } from 'react';
import { Col, Row } from "react-native-easy-grid";
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
            locked: false,
            sum: 0,
            icon: "numeric-" + [i + 1] + "-box-multiple"
        }
    )
}

export default function Gameboard() {
const [turn, setTurn] = useState(0);
const [throwsLeft, setThrowsLeft] = useState(THROWS);
const [status, setStatus] = useState('');
const [pointsStatus, setPointsStatus] = useState("");
const [total, setTotal] = useState(0);
const [selectedDices, setSelectedDices] =
    useState(new Array(DICES).fill(false));
const [selectedPoints, setSelectedPoints] =
    useState(slots);

// render placeholder dice at new game
useEffect(() => {
    for (let i = 0; i < DICES; i++) {
        if (!selectedDices[i]) {
            let number = i + 1;
            board[i] = 'dice-' + number + "-outline";
        }
    }
}, [])

// handle throwsleft changes
useEffect(() => {
    if (turn === 0) {
        setStatus("Game has not started.");
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

// check if game is over after every turn
useEffect(() => {
    let untilBonus = 63 - total;
    if (untilBonus <= 0) {
        setPointsStatus("You got the bonus!")
    } else {
        setPointsStatus("You need " + untilBonus + " points to get bonus!");
    }
    let points = [...selectedPoints];
    checkGameOver(points);
}, [turn])


// FUNCTION: get the index of slots object
const getIndex = (i) => {
    let index = selectedPoints.findIndex((item => item.id == i));
    return index;
}

// FUNCTION: THROW DICE
const throwDice = () => {
    if (status === "Game over!") {
        let slots = [];
            for (let i = 0; i < POINT_SLOTS; i++) {
                slots.push(
                    {
                        id: i,
                        selected: false,
                        locked: false,
                        sum: 0,
                        icon: "numeric-" + [i + 1] + "-box-multiple"
                    }
                )
            }
        setSelectedPoints(slots);
        setTotal(0);
        setPointsStatus("");
    }
    for (let i = 0; i < DICES; i++) {
        if (!selectedDices[i]) {
            let randomNumber = Math.floor(Math.random() * 6 + 1 );
            board[i] = 'dice-' + randomNumber;
        }
    }
    setTurn(turn+1);
    setStatus("Keep playing.");
    setThrowsLeft(throwsLeft - 1 )
}

// FUNCTION: SELECT DICE TO KEEP
const selectDice = (i) => {
    if (throwsLeft == 0) {
        setStatus("Select points to keep before next round!");
        return;
    } else if (throwsLeft == 3) {
        setStatus("Throw the first throw!");
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

// FUNCTION: check if game is over and handle it
const checkGameOver = (points) => {
    const checkEnd = points.every(data => data.locked);
    if (checkEnd) {
        setStatus("Game over!");
        if (total > 62) {
            setPointsStatus("You got 10 bonus points!");
            setTotal(total + 10);
        }
    }
};

// FUNCTION: SELECT POINTS TO KEEP
const selectPoints = (i) => {
    // check throws left before new throws
    if (throwsLeft > 0) {
        setStatus("Throw your dice first!");
        return;
    }
    let points = [...selectedPoints];
    let index = getIndex(i);
    // already selected points can't be reallocated
    if (points[index]["selected"] == true) {
        return; 
    } else {
        points[index]["selected"] = true;
        setThrowsLeft(THROWS);

        //find out the sums of selected dice
        let summedPoints = board.map(item => item.slice(5,7));
        let count = summedPoints.filter(x => x == (index+1)).length;
        let sum = count * (index + 1);
        points[index]["sum"] = sum;
        points[index]["locked"] = true;
        setSelectedPoints(points);
        setTotal(total + sum);

        // check if there are points not yet collected
        const checkEnd = points.every(data => data.locked);
        if (!checkEnd) {
            setStatus("Begin next round.");
        }
        setTurn(1);
    }
}

// FUNCTION: get sum texts for each slot
const getSumText = (i) => {
    return selectedPoints[i]["sum"];
}

// FUNCTION: get icons for point slots. WIP: change icon if locked ?
const getIcon = (i) => {
    let index = getIndex(i);
    let iconToReturn = selectedPoints[index]["icon"];
    return iconToReturn;
}

// FUNCTION: SET SELECTED POINTS CATEGORY COLOR
const getPointsColor = (i) => {
    let index = getIndex(i);
    if (selectedPoints[index]["selected"] === true) {
        return "black";
    } else {
        return "red";
    }
}

// FUNCTION: get main button text
const getButtonText = () => {
    if (status === "Game has not started.") {
        return "Start Game";
    } else if (status === "Game over!") {
        return "Restart";
    } else {
        return "Throw Dice";
    }
}

// dice row/board
const row = [];
for (let i = 0; i < DICES; i++) {
    row.push(
        <Col key={"row" + i} style={Styles.dices} >
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

// point slot buttons
const points = [];
for (let i = 0; i < slots.length; i++) {
    points.push(
        <Col style={Styles.pointSlot}  key={"points" + i}>
            <Text style={Styles.pointSlotText}>{getSumText(i)}</Text>
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
            <Row style={Styles.row}><Text style={Styles.throwsText}>Throws Left: {throwsLeft}</Text></Row>
            <Row style={Styles.row}><Text style={Styles.statusText}>{status}</Text></Row>
            <Row size={2} style={Styles.row}>
                <Pressable
                style={Styles.button}
                disabled={throwsLeft == 0 ? true : false}
                onPress={() => throwDice()}>
                    <Text style={Styles.buttonText}>{getButtonText()}</Text>
                </Pressable>
            </Row>
            <Row style={Styles.row}><Text style={Styles.totalText}>Total: {total}</Text></Row>
            <Row style={Styles.row}><Text style={Styles.pointStatusText}>{pointsStatus}</Text></Row>
            <Row size={2}><Col/>{points}<Col/></Row>
        </Col>
      </Row>
  )
}