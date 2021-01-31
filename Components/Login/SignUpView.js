import * as React from 'react';
import firebase from 'firebase';
import {
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet, Image,
} from 'react-native';
import {Buttons} from "../Buttons";




//Denne komponent står for at returnere vores signupview.



const Sportsbørsen = require("../../assets/Sportsbørsen.png");




//Vi eksporterer vores komponent
export default class SignUpView extends React.Component {


    //Vi opretter states som vi skal bruge senere
    state= {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };


    //Vi opretter alle handlers som skal håndtere states i render funktionen
    setError = errorMessage => this.setState({errorMessage});
    clearError = () => this.setState({errorMessage: null});
    startLoading = () => this.setState({isLoading: true});
    endLoading = () => this.setState({isLoading: false});

    handleChangeEmail = email => this.setState({email});
    handleChangePassword = password => this.setState({password});



    //Vi laver en render funktion som returner diverse textinputs og knapper
    render = () => {
        const { email, password, errorMessage } = this.state;
        return(
            <View style={styles.Container}>
                <Image source={Sportsbørsen} style={styles.image}/>
            <View style={styles.insideContainer}>
                <TextInput placeholder={"email"} value={email} onChangeText={this.handleChangeEmail}
                style={styles.textInput}/>
                <TextInput placeholder={"password"} value={password} onChangeText={this.handleChangePassword}
                secureTextEntry
                style={styles.textInput}/>
                {errorMessage && (
                    <Text style={styles.error}>Error: {errorMessage} </Text>
                )}
                {this.renderButton()}
            </View>
        </View>
        )
    };


    //Denne funktion håndterer tryk på knappen signup
    handleSubmit = async () => {
        const {email, password} = this.state;
        try {
            this.startLoading();
            this.clearError();
            const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
            //Debug nye user i console
            console.log(result);
            this.endLoading();
            this.setState({isCompleted: true});
        } catch (e) {
            this.setError(e.message);
            this.endLoading();
        }
    };

    //returnerer knappen og activityindicator
    renderButton = () => {
        const {isLoading} = this.state;
        if (isLoading) {
            return <ActivityIndicator/>
        }
        return <Buttons onPress={this.handleSubmit} text="Sign Up"/>

    }

}
/*Styles*/
const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    insideContainer:{
        minWidth:'80%'
    },
    error: {
        color: 'red',
    },
    textInput: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 20,
    },
});