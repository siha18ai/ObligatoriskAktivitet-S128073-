import firebase from "firebase";
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';

export default class LogOutScreen extends React.Component {
    render() {
        return(
            <View>
                <Text style={styles.header}>Her er logud!</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    insideContainer:{
        minWidth:'80%'
    },
    error: {
        color: 'red',
    },
    textInput: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 20,
    },
});