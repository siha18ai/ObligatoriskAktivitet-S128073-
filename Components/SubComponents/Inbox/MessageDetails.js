import * as React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Platform, Alert } from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import {LogBox} from "react-native";

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});

export default class MessageDetails extends React.Component{

    state = { message: null};

    //Vi får id fra det produkt der er blevet trykket på og loader det fra firebase endpoint
    componentDidMount() {
        const id = this.props.navigation.getParam('id');

        this.loadMessage(id)

    }
    loadMessage = id => {
        firebase
            .database()
            .ref('/Message/'+id)
            .on('value', dataObject => {
                this.setState({ product: dataObject.val() });
            });
    };

    confirmDelete = () => {
        //Hvis platform er lig med ios eller android får vi en alert.
        //Derfor hvis det er computer vil den ikke gå ind i denne metode
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the message?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: this.handleDelete },
            ]);
        } else {
            if(confirm('Er du sikker på du vil slette denne besked?')){
                this.handleDelete()
            }
        }
    };

    handleDelete = () => {
        const {navigation} = this.props;
        const id = navigation.getParam("id");
        try {
            firebase
                .database()
                .ref(`/Message/${id}`)
                .remove();

            navigation.goBack();
        } catch (e) {
            Alert.alert(e.message);
        }
    };

    render() {
        //HVis der er et product skal den returnere nedenståe views og buttons
        const {message} = this.state;
        if (!message) {
            return(
                <Text>
                    No Message
                </Text>
            )
        }
        return(
            <View style={styles.container}>
                <Button title="Delete" onPress={this.confirmDelete}/>
                <View style={styles.row}>
                    <Text style={styles.label}> Message </Text>
                    <Text style={styles.value}> {message.message} </Text>
                </View>


            </View>

        )
    }

}