import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Camera from './SubComponents/CameraComponent';


export default class CameraScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Camera! </Text>
                <Camera/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});