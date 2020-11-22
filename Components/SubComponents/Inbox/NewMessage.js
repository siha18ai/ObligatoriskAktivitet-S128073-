import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import {Body, Container, Content, Header, Title} from "native-base";

export default class NewMessage extends React.Component{
    /*
    Ved ikke hvor den skal placeres endnu...
    Bedste case vil være at placere den i henhold til et produkt
     */
    state = {
        message: ''
    }

    handleMessage = text => this.setState({message: text});

    handleSave = () => {
        const {message} = this.state;
        const {navigation} = this.props;
        try {
            const reference = firebase
                .database()
                .ref('/Message/')
                .push({message});
            Alert.alert('Saved');
            this.setState({
                message: ''
            });
            navigation.goBack();
        } catch (e) {
            Alert.alert(`Error: ${e.message}`)
        }
    };

    render() {
        const {message} = this.state;

        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={styles.label}> Message </Text>
                        <TextInput
                        value={message}
                        onChangeText={this.handleMessage}
                        style={styles.input}/>
                    </View>
                    <Button title={"Send"} onPress={this.handleSave}/>
                </ScrollView>
            </SafeAreaView>
        )
    }


}


const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        flex: 1,
        justifyContent:'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: { fontWeight: 'bold', width: 100 },
    input: { borderWidth: 1, flex: 1 },
});
