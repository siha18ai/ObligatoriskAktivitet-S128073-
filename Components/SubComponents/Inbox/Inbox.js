import React, {Component} from 'react';
import { Button, StyleSheet, View, Image } from 'react-native';
import InboxContent from './InboxContent'
import Text from "react-native-web/dist/exports/Text";
import { Container, Header, Title, Content, Icon, Left, Right, Body} from "native-base";


export default class Inbox extends Component{

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                <Title> Indbakke </Title>
                    </Body>
                </Header>
                <Content>
                    <InboxContent/>
                </Content>
            </Container>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
});