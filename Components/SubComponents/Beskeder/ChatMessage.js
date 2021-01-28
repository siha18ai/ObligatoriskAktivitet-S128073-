import * as React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';

import firebase from "firebase";
import {Buttons} from "../../Buttons";

export default class ChatMessage extends React.Component {
    render() {
        const {message, Photo } = this.props;
        return (
            <Text>{message.content}</Text>
        );
    }
}