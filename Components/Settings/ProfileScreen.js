import * as React from 'react';
import firebase from 'firebase';
import {Button, ScrollView, StyleSheet, TextInput, View, Alert, Platform, Text} from "react-native";
import RadioButtonRN from "radio-buttons-react-native";


//Dennne komponent returnerer et view, hvor brugeren kan ændre i sine oplysninger


//Vi eksporterer vores komponent
export default class ProfileScreen extends React.Component {

    //Vi laver en konstruktor
    constructor() {
        super();
    }


    //Vi opretter nogel states som vi skal bruge i render
    state={
        id: firebase.auth().currentUser.uid,
        user: firebase.auth().currentUser,
        email: firebase.auth().currentUser.email,
        password: '',
        name: '',
        address: '',
        telephone: '',
        gender: '',
        radio_button: ''
    }

    //Vi opretter diverse handlers som skal ændre på vores states i render funktionen
    handleEmailChange = email => this.setState({email});
    handlePasswordChange = password => this.setState({password});
    handleNameChange = name => this.setState({name});
    handleAddressChange = address => this.setState({address});
    handleTelephoneChange = telephone => this.setState({telephone});
    handleGenderChange = gender => {
        const gender_val = gender.label;
        this.setState({gender: gender_val});
    }


    //Vi kalder på componentDidMount som bliver executetet når komponenten bliver kaldt
    componentDidMount() {
        this.getCurrentUserAttribute()
    }

    //Få hentet informationer på eksisterende brugere
    getCurrentUserAttribute = async () => {
        const {id, gender} = this.state;
        try {
            const allUsers=[];
            await firebase
                .database()
                .ref('/UserAttributes/'+id)
                .on('value', snapshot => {
                    if (snapshot.val()) {
                        const currentAttributes = Object.values(snapshot.val());
                        const currentIdKeys = Object.keys(snapshot.val());
                        const unique_attribute_id = currentIdKeys[0];
                        console.log(currentAttributes);
                        const {name, address, telephone, gender} = currentAttributes[0];
                        this.setState({name, address, telephone, gender, unique_attribute_id})
                    }
                });

        } catch (e) {
            console.log("Fejl på hentning af brugere", e)
        }
        
        if (this.state.gender === 'Kvinde') {
            this.setState({radio_button: 1})
        } else {
            this.setState({radio_button: 2})
        }
    }

    //Gem de indtastede brugerinformationer
    saveProfile = async () =>{
        const {navigation} = this.props;
        const {id, email, password, name, address, telephone, gender} = this.state;
        const currentEmail = firebase.auth().currentUser.email;
        const newEmail = email;
        const currentPassword = password;
        const userId = firebase.auth().currentUser.uid;

        if (currentEmail != newEmail) {

        }

        try {
            //Når der ikke er noget data at pushe op
            if (!userId) {
                const reference = firebase
                    .database()
                    .ref('/UserAttributes/'+id)
                    .push({id, name, address, telephone, gender});

                if (Platform.OS != "web") {
                    Alert.alert("Dine profil informationer er nu opdateret");
                    navigation.goBack();
                } else {
                    alert("Dine profil informationer er nu opdateret");
                    navigation.goBack();
                }

            } else {
                //Når der ikke er noget data at opdatere 
                try {
                    await firebase
                        .database()
                        .ref('/UserAttributes/'+id)
                        .update({id, email, name, address, telephone, gender});
                    if (Platform.OS != "web") {
                        Alert.alert("Dine profil informationer er nu opdateret");
                        navigation.goBack();
                    } else {
                        alert("Dine profil informationer er nu opdateret");
                        navigation.goBack();

                    }
                } catch (e) {
                    console.log("Fejl i update", e)
                }

            }
        } catch (e) {
            console.log(e)
        }
    }


    //Vi kalder på vores renter funktion som returnerer nogle texinput som brugere skal bruge til at ændre oplysninger
    render() {
        const {email, password, id, name, address, telephone, gender} = this.state;
        const radioButtons = [
            {label: 'Kvinde'},
            {label: 'Mand'}
        ];
        return(
            <View style={styles.Container}>
                <ScrollView>
                    <View>
                        <Text> Email </Text>
                        <TextInput
                        placeholder={"email@email.dk"}
                        value={email}
                        onChangeText={this.handleEmailChange}
                        style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text> Navn </Text>
                        <TextInput
                            placeholder={"navn"}
                            value={name}
                            onChangeText={this.handleNameChange}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text> Adresse </Text>
                        <TextInput
                            placeholder={"Matthæusgade 48 1666"}
                            value={address}
                            onChangeText={this.handleAddressChange}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text> Telefon </Text>
                        <TextInput
                            placeholder={"29903048"}
                            value={telephone}
                            onChangeText={this.handleTelephoneChange}
                            style={styles.textInput}
                        />
                    </View>
                    <View>
                        <Text> Køn </Text>
                        <RadioButtonRN
                        data={radioButtons}
                        value={gender}
                        initial={1}
                        activeColor={"green"}
                        selectedBtn={this.handleGenderChange}
                        />
                    </View>
                    <Button title={"Gem"} onPress={this.saveProfile}/>
                </ScrollView>
            </View>
        )
    }
}


//Styles
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
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
        image: {
            alignContent: 'center'
        }
},
    );