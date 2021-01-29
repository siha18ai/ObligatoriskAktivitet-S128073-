import * as React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';

import firebase from "firebase";
import {Buttons} from "../../Buttons";

export default class ChatMessage extends React.Component {
    render() {
        const {message } = this.props;
        return (
            <Text>{message}</Text>
        );
    }
}