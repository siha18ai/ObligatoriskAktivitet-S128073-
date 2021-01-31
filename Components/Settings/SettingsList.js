import * as React from 'react';
import {View, Text, TouchableOpacity, Button, Alert, StyleSheet, Image, ActivityIndicator} from "react-native";
import firebase from 'firebase';
import {Buttons} from "../Buttons";
import * as ImagePicker from "expo-image-picker";


//Denne komponent er hovedkomponenten i settinsnavigator. Den indeholder 4 knapper som hver har en funktion


//Vi eksporterer vores komponent
export default class SettingsList extends React.Component{


    //Vi opretter states som vi skal bruge i render
    state={
        hasCameraRollPermission: null,
        lastPhoto: null,
        galleryImages: null,
        image: null,
        pickedImageUri: null,
        isUploading: false,
        errorMessage: null,
        isCompleted: false,
        id: firebase.auth().currentUser.uid,
        pictureName: '',
        imageUri:'',
        uploadedImageUri: '',
    };

    //Vi laver en handler som håndterer vores states i render
    handleUploadImageChangeSettings = text => this.setState({uploadedImageUri: text});


    //Denne funktion gør at man kommer ind på sit galeri
    pickImageSettings = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });
        this.setState({ image: result.uri });
    };


    //Denne funktionen håndterer tryk på upload knappen
    handleUploadImageSettings = async () => {
        const {image} = this.state;
        const {currentUser} = firebase.auth();
        this.setState({isUploading: true, errorMessage: null});
        try {
            const uploadedImageUrl = await this.uploadImageSettings(image);
            this.handleUploadImageChangeSettings(uploadedImageUrl);
            await this.attatchPictureToProfile(uploadedImageUrl);
            this.setState({isUploading: false, isCompleted: true})
        } catch (e) {
            this.setState({isUploading: false, errorMessage: error.message});
        }
    };

    //Denne funktione uploader billedet til databasen
    uploadImageSettings = async (uri) => {
        const {currentUser} = firebase.auth();
        const {pictureName} = this.state;
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase
            .storage()
            .ref()
            .child('Profile/'+currentUser.uid+'/billede');
        await ref.put(blob);
        const uploadedImageUrl = await ref.getDownloadURL();
        return uploadedImageUrl;
    };


    //Denne funktion vedhæfter billedet til brugeren
    attatchPictureToProfile = async uploadedImageUrl => {
        const{id} = this.state;
        firebase
            .database()
            .ref('/UserAttributes/' + id + '/billede')
            .update({
                uploadedImageUrl
            });
    };


    //Vi laver en render funktion som returenrer diverse knapper
    render() {
        const {
            image,
            isCompleted,
            isUploading,
            errorMessage
        } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.view1}>
                <Buttons
                    text="Profil"
                    onPress={() => this.props.navigation.navigate('ProfileScreen')}/>

                </View>
                <View style={styles.view1}>
                    <Buttons
                        text="Kundeservice"
                        onPress={() => this.props.navigation.navigate('KundeService')}
                    />
                </View>
                <View style={styles.view1}>
                    <Buttons text="Tag foto" onPress={this.pickImageSettings}/>
                    {image && (
                        <View>
                            <Image source={{ uri: image}} style={styles.image}/>
                            <Buttons
                                disabled={isUploading}
                                text={"Upload"}
                                onPress={this.handleUploadImageSettings} />
                        </View>
                    )}
                    {isUploading && <ActivityIndicator/>}
                    {isCompleted && <Text>Billedet er nu vedhæftet produktet</Text>}
                    {errorMessage && <Text> {errorMessage} </Text>}
                </View>
                <View style={styles.view1}>
                <Buttons onPress={() => Alert.alert(   // Shows up the alert without redirecting anywhere
                    'Godkendt følgende'
                    , 'Vil du gerne logge ud?'
                    , [
                        {
                            text: 'Ja', onPress:async () => {
                                try {
                                    const response = await firebase.auth().signOut();

                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        },
                        {text: 'Nej'}
                    ]
                )} text="Log ud"/>
                </View>
            </View>
        )
    }
}


//Styles
const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: '#00f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
        paddingTop: 40

    },
    insideContainer:{
        minWidth:'80%'
    },
    error: {
        color: '#00f',
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