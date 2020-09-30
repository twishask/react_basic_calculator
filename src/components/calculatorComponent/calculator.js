import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import { Row, Col, Input, Button } from 'reactstrap';
import { Switch, FormGroup, Typography, Grid } from '@material-ui/core';
import { CALCULATOR_BUTTONS } from '../constants';
import { lightTheme } from './theme';
import './calculator.css';

function CalculatorComponent() {
    const buttonRow1 = CALCULATOR_BUTTONS.slice(0, 4);
    const buttonRow2 = CALCULATOR_BUTTONS.slice(4, 8);
    const buttonRow3 = CALCULATOR_BUTTONS.slice(8, 12);
    const buttonRow4 = CALCULATOR_BUTTONS.slice(12, 16);
    const allButtons = [buttonRow1, buttonRow2, buttonRow3, buttonRow4];

    const [previousOperand, setPreviousOperand] = useState(0);
    const [currentOperand, setCurrentOperand] = useState("");
    const [currentOperator, setCurrentOperator] = useState("");
    const [previousOperator, setPreviousOperator] = useState("");
    const [resultNow, setResultNow] = useState(0);

    const [scientificMode, setScientificMode] = useState(false);
    const [darkThemeOn, setDarkTheme] = useState(false);
    const [backgroundTheme, setBackgroundTheme] = useState('lightBackground background');
    const [buttonTheme, setButtonTheme] = useState('lightButton Button');
    const [textTheme, setTextTheme] = useState('lightText Text');

    function calculateTheResult(x) {

        let number = parseInt(currentOperand);
        if (currentOperand == '') {
            setPreviousOperator(x);
            return;
        }
        switch (previousOperator) {
            case '+':
                setResultNow(resultNow + number);
                break;
            case '-':
                setResultNow(resultNow - number);
                break;
            case '*':
                setResultNow(resultNow * number);
                break;
            case '/':
                setResultNow(resultNow / number);
                break;
            case '':
                setResultNow(number);
                break;
            default:
                console.log('Something went wrong');
        }
        if (x == '=') {
            setPreviousOperator('');
            setPreviousOperand('');
            setScientificMode(false);
        }
        else {
            setPreviousOperator(x);
            setPreviousOperand(number);
        }
        setCurrentOperator("");
        setCurrentOperand("");

        return 120;
    }

    function inputOperand(num) {
        setCurrentOperand("" + currentOperand + num);
        return;
    }

    function inputOperator(x) {
        setCurrentOperator(x);
        calculateTheResult(x);
        return;
    }

    function clearStack() {
        setPreviousOperand(0);
        setCurrentOperand('');
        setCurrentOperator('');
        setPreviousOperator('');
        setResultNow(0);
        setScientificMode(false);
        return;
    }

    function decideAction(item) {
        let x = item;
        switch (true) {
            case (x < 10):
                inputOperand(x);
                break;
            case (x == '='):
                calculateTheResult(x);
                break;
            case (x == '+' || x == '-' || x == '*' || x == '/'):
                inputOperator(x);
                break;
            case (x == 'CLEAR'):
                clearStack();
                break;
            default:
                console.log('Something went wrong');
        }
    }

    function square() {
        if (currentOperand == '')
            return;
        setResultNow(Math.pow(currentOperand, 2));
        setPreviousOperand(currentOperand);
        setCurrentOperand('');
    }

    function squareRoot() {
        if (currentOperand == '')
            return;
        setResultNow(Math.sqrt(currentOperand));
        setPreviousOperand(currentOperand);
        setCurrentOperand('');
    }

    function changeSign() {
        if (currentOperand == '')
            return;
        setCurrentOperand(-1 * (currentOperand));
    }

    function changeTheme() {
        if (darkThemeOn) {
            setDarkTheme(false);
            setBackgroundTheme('lightBackground background');
            setButtonTheme('lightButton Button');
            setTextTheme('lightText Text');

        }
        else {
            setDarkTheme(true);
            setBackgroundTheme('darkBackground background');
            setButtonTheme('darkButton Button');
            setTextTheme('darkText Text');
        }
    }

    return (
        <div className="App">
            <div className={backgroundTheme}>
                <p>Basic Calculator</p>

                <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 31 }}>
                    <Col>
                        <Input className="operandInput" disabled={true} placeholder="" value={currentOperand || previousOperand} bsSize="sm" type="textArea" name="operandInput" id="operandInput" />
                    </Col>
                </Row>
                {allButtons.map((buttonRow) => {
                    return (
                        <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 31 }}>
                            {buttonRow.map((item) => {
                                return (
                                    <Col>
                                        <Button className={buttonTheme} onClick={() => { decideAction(item) }}><text className="basicCalcButtonText">{item}</text></Button>
                                    </Col>
                                )
                            }
                            )}

                        </Row>
                    )
                }
                )}
                
                <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 11 }}>
                    <Button className={buttonTheme} onClick={() => { setScientificMode(true) }}><text className="scientificModeButtonText">Scientific mode</text></Button>
                    {scientificMode == true &&
                        <div style={{}}>
                            <Button className={buttonTheme} onClick={() => { changeSign() }}><text className="advancedButtonsText">Change Sign</text></Button>
                            <Button className={buttonTheme} onClick={() => { square() }}><text className="advancedButtonsText">^2</text></Button>
                            <Button className={buttonTheme} onClick={() => { squareRoot() }}><text className="advancedButtonsText">&#8730;</text></Button>
                        </div>
                    }
                </Row>
                <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 11 }}>
                    <Col style={{ borderWidth: 1, padding: 5 }}>
                        Result
                    </Col>
                    <Col style={{ borderWidth: 1, padding: 5 }}>
                        {resultNow}
                    </Col>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <FormGroup>
                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>Light Theme</Grid>
                                <Grid item>
                                    <Switch
                                        checked={darkThemeOn}
                                        onChange={() => { changeTheme() }}
                                        color="primary"
                                        name="checkedA"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </Grid>
                                <Grid item>Dark Theme</Grid>
                            </Grid>
                        </Typography>
                    </FormGroup>
                </div>
            </div>
        </div>
    );
}

export default withRouter(CalculatorComponent);
