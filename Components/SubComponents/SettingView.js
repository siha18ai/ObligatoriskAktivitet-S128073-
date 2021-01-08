import firebase from "firebase";
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import {Navigator, Stack, Modal} from 'react-native-navigation-library/dist/index';
import * as React from 'react';

import {Body, Container, Content, Header, Title} from "native-base";
import {NavigationContainer} from "@react-navigation/native";
import ProfileScreen from "../Settings/ProfileScreen";
import {createStackNavigator} from "@react-navigation/stack";
import SettingsList from "../Settings/SettingsList";

const StackNav = createStackNavigator();

export default class SettingView extends React.Component{
    render() {
        return (

                <NavigationContainer>
                    <StackNav.Navigator>
                        <StackNav.Screen name={"SettingsList"} component={SettingsList}/>
                        <StackNav.Screen name={"ProfileScreen"} component={ProfileScreen}/>
                    </StackNav.Navigator>
                </NavigationContainer>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        flex: 1,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});