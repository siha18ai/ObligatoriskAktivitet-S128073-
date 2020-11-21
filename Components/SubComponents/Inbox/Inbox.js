import * as React from 'react';
import { Button, StyleSheet, View, Image } from 'react-native';
import Text from "react-native-web/dist/exports/Text";
import { Container, Header, Title, Content, Icon, Left, Right, Body} from "native-base";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import NewMessage from "./NewMessage";
import InboxContent from "./InboxContent";



const Stack = createStackNavigator();


export default class Inbox extends React.Component{
render() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={"InboxContent"} component={InboxContent}/>
                <Stack.Screen name={"NewMessage"} component={NewMessage}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}
    }



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
});