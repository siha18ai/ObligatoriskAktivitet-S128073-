import React, {Component} from 'react';
import { Button, StyleSheet, View, Image } from 'react-native';
import { Container, Header, Title, Content, Icon, Left, Right, Body} from "native-base";
import InboxContent from "../Inbox/Inbox";


export default class MyTrades extends Component{
    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                    <Title> Mine handler </Title>
                    </Body>
                </Header>
            </Container>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
});