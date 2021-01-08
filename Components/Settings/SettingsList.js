import * as React from 'react';
import {View, Text, TouchableOpacity, Button, Alert, StyleSheet} from "react-native";
import firebase from 'firebase';


export default class SettingsList extends React.Component{


    render() {
        return(
            <View>
                <Button
                    title={"Profil"}
                    onPress={() => this.props.navigation.navigate('ProfileScreen')}/>
                <Button onPress={() => Alert.alert(   // Shows up the alert without redirecting anywhere
                    'Godkendt følgende'
                    , 'Vil du gerne logge ud?'
                    , [
                        {
                            text: 'Ja', onPress:async () => {
                                try {
                                    const response = await firebase.auth().signOut();

                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        },
                        {text: 'Nej'}
                    ]
                )} title={"Log ud"}/>
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