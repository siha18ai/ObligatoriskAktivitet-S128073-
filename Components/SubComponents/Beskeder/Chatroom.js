import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class ChatRoom extends React.Component{
    render() {
        return(
            <View>
                <Text>Chat room</Text>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});