import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Square from "./Square";
// You can import from local files

// or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xTurn: true,
            squares: Array(9).fill(null),
            gameWon: false,
            winner: null,
            numClicked: 0
        }
    }

    checkWinner = () => {
        if(this.checkRow(0, "X") || this.checkRow(3, "X") || this.checkRow(6, "X")
            || this.checkCol(0, "X") || this.checkCol(1, "X") || this.checkCol(2, "X")
            || this.checkDiag("X")) {
            this.setState({
                gameWon: true,
                winner: "X"
            })
        }

        if(this.checkRow(0, "O") || this.checkRow(3, "O") || this.checkRow(6, "O")
            || this.checkCol(0, "O") || this.checkCol(1, "O") || this.checkCol(2, "O")
            || this.checkDiag("O")) {
            this.setState({
                gameWon: true,
                winner: "O"
            })
        }
    }

    checkRow = (num, letter) => {
        let ar = this.state.squares;
        if(ar[num] === letter && ar[num+1] === letter && ar[num+2] === letter)
            return true;
        return false;
    }

    checkCol = (num, letter) => {
        let ar = this.state.squares;
        if(ar[num] === letter && ar[num+3] === letter && ar[num+6] === letter)
            return true;
        return false;
    }

    checkDiag = (letter) => {
        let ar = this.state.squares;
        if((ar[0] === letter && ar[4] === letter && ar[8] === letter)
            || (ar[2] === letter && ar[4] === letter && ar[6] === letter))
            return true;
        return false;
    }

    handleClick = (index) => {
        if(this.state.squares[index] === null && !this.state.gameWon) {
            let sq = this.state.squares;
            sq[index] = this.state.xTurn ? "X" : "O";
            this.setState({
                numClicked: this.state.numClicked+1,
                squares: sq,
                xTurn: !this.state.xTurn,
            })
            this.checkWinner();
        }
    }

    playAgain = () => {
        this.setState({
            gameWon: false,
            squares: Array(9).fill(null),
            winner: null,
            xTurn: true,
            numClicked: 0
        })
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.xTurn ? (
                    <Text style={{paddingBottom: 20, paddingTop: 80, paddingLeft: 75, fontSize: 96}}>X Turn</Text>
                ) : <Text style={{paddingBottom: 20, paddingTop: 80, paddingLeft: 75, fontSize: 96}}>O Turn</Text>}
                <View style={styles.row}>
                    <Square onPress={this.handleClick} index={0} number={this.state.squares[0]} />
                    <Square onPress={this.handleClick} index={1} number={this.state.squares[1]} />
                    <Square onPress={this.handleClick} index={2} number={this.state.squares[2]} />
                </View>
                <View style={styles.row1}>
                    <Square onPress={this.handleClick} index={3} number={this.state.squares[3]} />
                    <Square onPress={this.handleClick} index={4} number={this.state.squares[4]} />
                    <Square onPress={this.handleClick} index={5} number={this.state.squares[5]} />
                </View>
                <View style={styles.row2}>
                    <Square onPress={this.handleClick} index={6} number={this.state.squares[6]} />
                    <Square onPress={this.handleClick} index={7} number={this.state.squares[7]} />
                    <Square onPress={this.handleClick} index={8} number={this.state.squares[8]} />
                </View>
                {this.state.gameWon ? (
                    <View style={styles.win}>
                        <Text style={styles.text}>{this.state.winner} Won!</Text>
                        <TouchableOpacity style={styles.button} title="Play again" onPress={this.playAgain}>
                            <Text style={styles.text}>Play again</Text>
                        </TouchableOpacity>
                    </View>
                ) : <View></View>
                }
                {this.state.numClicked === 9 && !this.state.gameWon ? (
                    <View style={styles.win}>
                        <Text style={styles.text}>It is a Draw</Text>
                        <TouchableOpacity style={styles.button} title="Play again" onPress={this.playAgain}>
                            <Text style={styles.text}>Play again</Text>
                        </TouchableOpacity>
                    </View>
                ) : <View></View>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "azure",
        padding: 8,
    },
    button: {
        backgroundColor: "grey"
    },
    text: {
        margin: 24,
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 77
    },
    row1: {
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        top: 335,
        left: 85
    },
    row2: {
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        top: 415,
        left: 85
    },
    win: {
        position: "absolute",
        top: 520,
        left: 100
    }
});

export default App;

