import firebase from "firebase";
import {StyleSheet, Text, View, Button, Alert} from 'react-native';
import * as React from 'react';

import LogOutScreen from './LogOutView';
import {Body, Container, Content, Header, Title} from "native-base";
import InboxContent from "./Inbox/Inbox";

export default class SettingView extends React.Component{


    render() {
        const {email} = this.props;
        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                    <Title> Indstillinger </Title>
                    </Body>
                </Header>
            <View style={styles.container}>
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
                <Text style={styles.label}>
                    {email}
                </Text>
            </View>
            </Container>

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