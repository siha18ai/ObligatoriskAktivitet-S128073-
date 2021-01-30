import * as React from 'react';
import firebase from 'firebase';
import {Button, FlatList, ScrollView, StyleSheet, TextInput, View, Alert, Platform, Text} from "react-native";
import RadioButtonRN from "radio-buttons-react-native";


export default class ProfileScreen extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>
                    Vil du donere dit brugte sportsudstyr? Ring på +45 12345678
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftContainer: {
        flexDirection: 'row'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    username: {
        //fontweight: 'bold',
        //fontsize: 16,
    },
    lastMessage: {
        //fontsize: 16,
        color:'grey'
    },
    time: {
        fontSize: 14,
        color: 'grey'
    },
    midContainer: {
        justifyContent: 'space-around'
    },
    view1: {
        flex: 3,
        justifyContent: 'space-around'
    },
    view2: {
        flex: 1,
        justifyContent: 'space-around'
    }
});