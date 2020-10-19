import React, {Component} from 'react';
import { Text, View, StyleSheet, Button, Alert,LogBox } from 'react-native';
import * as Google from 'expo-google-app-auth';

const googleConfig =
    {
        iosClientId: '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com',
        androidClientId: '603386649315-9rbv8vmv2vvftetfbvlrbufcps1fajqf.apps.googleusercontent.com',
        iosStandaloneAppClientId: '<IOS_CLIENT_ID>',
        androidStandaloneAppClientId: '<ANDROID_CLIENT_ID>'
    }



export default class GoogleLogin extends Component{
    state = {isLoggedIn: null,
        googleUser:"",
        googleToken:""};

    _handleGoogleLogin = async () => {
        try {
            const {type, accessToken, user} = await Google.logInAsync(googleConfig);

            if (type === "success") {
                this.setState({googleUser: user});
                this.setState({isLoggedIn: true});
                this.setState({googleToken:accessToken});

                /*Debug til om der et token sat*/
                console.log(accessToken+ ' her er token')

            } else if (type === "cancel") {
                Alert.alert("Prøv igen!")
            } else {
                Alert.alert("Hov! Login fejlede")
            }
        } catch (e) {
            console.log(e);
        }
    };

    _handleGoogleLogout = async () => {
        try {

            const {type} = await Google.logOutAsync({accessToken:this.state.googleToken,...googleConfig});
            this.setState({isLoggedIn: false, googleUser: "", googleToken: ""});
            console.log("Dette er min" + type)

        } catch (e) {
            console.log(e);

        }
    };

        render() {
        const {googleUser ,isLoggedIn} = this.state;

        if (!isLoggedIn) {
            return(
            <View style={styles.container}>
                <Text style={styles.paragraph}> Hej, Du er logget ud af Google! </Text>
                <Button title={"GoogleLogin"} onPress={this._handleGoogleLogin}/>
            </View>
            )
        } else {
            return(
                <View style={styles.container}>
                    <Text style={styles.paragraph}> Hej {googleUser.name}, Du er logget ind med Google! </Text>
                    <Button title={"GoogleLogout"} onPress={this._handleGoogleLogout()}/>
                </View>
            )
        }

    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});