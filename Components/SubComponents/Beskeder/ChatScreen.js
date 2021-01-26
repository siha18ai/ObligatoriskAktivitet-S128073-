import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ChatListItem from "./Index";
import {View, Text} from './Themed'

export default function ChatsScreen() {
    return (
        <View style={styles.container}>
            <Text>Hey</Text>
            <ChatListItem chatRoom={{lastMessage: {content: "Hello"}}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});