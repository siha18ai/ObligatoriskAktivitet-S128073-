import * as React from 'react';
import firebase from 'firebase';
import {
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    Alert,
    Image
} from 'react-native';
import {Buttons} from "../Buttons";


//Denne komponent returnerer vores login skærm.





//Vi importerer vores billede
const Sportsbørsen = require("../../assets/Sportsbørsen.png");


//Vi returnerer vores komponent
export default class LoginView extends React.Component {

    //Opretter states
    state = {
        email: '',
        password: '',
        isLoading: false,
        isCompleted: false,
        errorMessage: null,
    };

    //Vi opretter alle handlers vi bruger i renderfunktionen
    setError = errorMessage => this.setState({errorMessage});
    clearError = () => this.setState({errorMessage: null});
    startLoading = () => this.setState({isLoading: true});
    endLoading = () => this.setState({isLoading: false});

    handleChangeEmail = email => this.setState({email});
    handleChangePassword = password => this.setState({password});


    //Vi laver en render funktion der returnerer diverse textinput og en knap over til signupview
    render = () => {
        const { email, password, errorMessage } = this.state;
        return (
        <View style={styles.Container}>
            <Image source={Sportsbørsen} style={styles.image}/>
            <View style={styles.insideContainer}>
                <TextInput
                    placeholder="email"
                    value={email}
                    onChangeText={this.handleChangeEmail}
                    style={styles.textInput}/>
                <TextInput
                    placeholder="password"
                    value={password}
                    onChangeText={this.handleChangePassword}
                    secureTextEntry
                    style={styles.textInput}/>
                {errorMessage && (
                    <Text style={styles.error}> Error: {errorMessage} </Text>
                )}
                {this.renderButton()}
            </View>
        </View>
        )
    };

    //Vi laver en funktion der håndterer, at brugeren logger ind
    handleSubmit = async () => {
        const {email, password} = this.state;
        try {
            this.startLoading();
            await console.log("Email: " + email + " og password: " + password);
            this.clearError();
            await firebase.auth().signInWithEmailAndPassword(email, password);
            this.endLoading();
            this.setState({isCompleted: true});
        } catch (e) {
            this.setError("Forkert email eller password");
            this.endLoading();
        }
    };
    renderButton = () => {
        const {isLoading} = this.state;
        if (isLoading) {
            return <ActivityIndicator/>
        }
        return <Buttons onPress={this.handleSubmit} text="Login"/>

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
        color: 'blue',
    },
    textInput: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 20,
    },
    image: {
        alignContent: 'center'
    }
});