import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';

export default function App() {
  const [firstLoad, setLoad] = React.useState(true);
  const [data, upDateData] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  let isLoading = true;

  async function sampleFunc() {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        let body = await response.json();
        upDateData(body);
    }

  if (firstLoad) {
 //       sampleFunc();
        setLoad(false);
    }

  if (data.length > 0) isLoading = false;

  const posts = data.map(post => (
        <Text key={post.id}>
            <Text style={formStyle.title}>{post.title}</Text>
            {"\n"}
            <Text>{post.body}</Text>
            {"\n"}
            {"\n"}
        </Text>
    ));

  const submit = async (e) => {
      e.preventDefault();
      console.log("Button pressed");
      const post = {
          title: title,
          body: body
      }
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
              "content-type": "application/json"
          },
          body: JSON.stringify(post)
      });
      const dat = await response.json();
      dat.body = "Response received " + dat.body;
      upDateData([dat].concat(data));

      setTitle("");
      setBody("");
   //   const upd = [post];
     // upDateData(upd.concat(data));
  }

  return (
    <View style={styles.container}>
        <ImageBackground source={{ uri: "https://reactjs.org/logo-og.png"}} style={styles.image}>
        <View style={styles.inner}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <TextInput placeholder="Title" style={formStyle.textInput} value={title} onChangeText={title => setTitle(title)} />
            <TextInput placeholder="Enter text" multiline={true} style={formStyle.bodyInput} value={body} onChangeText={body => setBody(body)} />
            <TouchableOpacity style={styles.but} title="Submit" onPress={submit}>
                <Text>Submit</Text>
            </TouchableOpacity>
          <Text>{posts}</Text>
    </ScrollView>
        </View>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
    alignItems: 'center',
    justifyContent: 'center',
  },
    inner: {
      marginLeft: 100,
        marginRight: 15,
        marginTop: 50
    },
    but: {
      marginLeft: 220,
        marginTop: 20,
        backgroundColor: "blue",
        width: 80,
        height: 20,
        alignItems: "center"
    },
    image: {
      flex: 1,
      resizeMode: "contain",
      justifyContent: "center"
    }
});

const formStyle = StyleSheet.create({
    container: {
        marginTop: 300,
        marginLeft: 100
    },
    title: {
        fontWeight: "bold",
        fontSize: 30
    },
    textInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 50,
        width: 100,
        fontSize: 25,
        paddingLeft: 20,
        paddingRight: 20,
        color: "black"
    },
    bodyInput: {
        borderColor: '#CCCCCC',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        height: 200,
        width: 300,
        fontSize: 25,
        color: "black",
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
    }
});
