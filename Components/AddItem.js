import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button
} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Icon } from "react-native-elements";

const AddItem = ({addItem}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const onChangeTitle = textValue => setTitle(textValue);
    const onChangeAuthor = textValue => setAuthor(textValue);
    const onChangeText = textValue => setText(textValue);

    return (
        <View>
            <TextInput
                placeholder="Title..."
                style={styles.input}
                onChangeText={onChangeTitle}
                value={title}
            />
            <TextInput
                placeholder="Author..."
                style={styles.input}
                onChangeText={onChangeAuthor}
                value={author}
            />
            <TextInput
                placeholder="Text..."
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    addItem({title, author, text});
                    setTitle("");
                    setAuthor("");
                    setText('');
                }}>
                <Text style={styles.btnText}>
                    Add Item
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        margin: 5,
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default AddItem;
