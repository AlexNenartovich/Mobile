import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';

import Header from './Components/Header';
import ListItem from './Components/ListItem';
 import AddItem from './Components/AddItem';

const App_original = () => {

    const [articles, setArticles] = useState([]);

    const [items, setItems] = useState([
        {
            id: 1,
            text: 'Milk',
        },
        {
            id: 2,
            text: 'Eggs',
        },
        {
            id: 3,
            text: 'Bread',
        },
        {
            id: 4,
            text: 'Juice',
        },
    ]);

    useEffect(() => {
        fetch("http://10.0.0.120:3300/comments").then(res => res.json())
            .then(article => setArticles(article.data));
    });

    const addArticle = async (article) => {
        const response = await fetch("http://10.0.0.120:3300/articletest", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(article)
        });
        const resp = await response.json();
        console.log(resp);
        setArticles(resp => setArticles(resp));
    }

    const addItem = text => {
        if (!text) {
            Alert.alert(
                'No item entered',
                'Please enter an item when adding to your shopping list',
                [
                    {
                        text: 'Understood',
                        style: 'cancel',
                    },
                ],
                {cancelable: true},
            );
        } else {
            setItems(() => {
      //          return [{id: 5, text}, ...prevItems];
                const item = {
                    id: items[items.length-1].id + 1,
                    text: text
                }
                return [...items, item];
            });
        }
    };

    const deleteArticle = (id) => {
   //     var params = new URLSearchParams({
     //       author: author
       // });
        fetch("http://10.0.0.120:3300/articletest/" + id, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json()).then(data => console.log(data));
    }

    const deleteItem = id => {
        setItems(array => {
            let newArray = [];
            for(let item of array) {
                if(item.id != id)
                    newArray.push(item);
            }
            return newArray;
        })
    }

    /*
    const deleteItem = id => {
        setItems(prevItems => {
             return prevItems.filter(item => item.id !== id)
        }
    );
    };
    */

    return (
        <View style={styles.container}>
            <Header title="Shopping List" />
            <AddItem addItem={addArticle} />
            <FlatList
             //   data={items}
                data={articles}
                renderItem={({item}) => (
                    <ListItem
                        item={item}
                        deleteArticle={deleteArticle}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60
    },
});

export default App_original;
