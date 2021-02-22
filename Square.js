import React from 'react';
import { Button, Text, TouchableOpacity, View, StyleSheet } from "react-native";

class Square extends React.Component {

    render() {
        return (
            <View>
                <TouchableOpacity activeOpacity={1} style={styles.button} onPress={() => this.props.onPress(this.props.index)}>
                    <Text style={{fontSize: 50, fontWeight: "bold"}}>{this.props.number}&nbsp;</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        borderWidth: 3,
        padding: 10,
        fontSize: 20,
        fontWeight: "bold",
        height: 80,
        width: 80
    }
})

export default Square;
