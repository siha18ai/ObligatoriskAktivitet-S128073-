
import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Image,
    AsyncStorage,
    KeyboardAvoidingView,
    Button,
    ActivityIndicator,
    Picker
} from 'react-native';
import firebase from 'firebase';
import {Body, Container, Header, Title, ActionSheet, Root} from "native-base";
import {Buttons} from "./Buttons";
import {TextField} from "./Form";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {setSelectedLog} from "react-native/Libraries/LogBox/Data/LogBoxData";


const width = Dimensions.get('window').width;


export default class AddProduct extends React.Component {


    state = {
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
        brand: '',
        price: '',
        type: '',
        size: '',
        imageUri: '',
        uploadedImageUri: '',
        sport: ''
    };

    //vi sætter state i de forskellige attributter fra det brugeren har indtastet
    handlePictureNameChange = text => this.setState({pictureName: text});

    handleBrandChange = text => this.setState({brand: text});

    handleSizeChange = text => this.setState({size: text});

    handlePriceChange = text => this.setState({price: text});

    handleTypeChange = text => this.setState({type: text});

    handleUploadImageChange = text => this.setState({uploadedImageUri: text});

    handleChangeSport = text => this.setState({sport: text});


    handleSave = () => {
        const {
            id,
            pictureName,
            brand,
            price,
            type,
            size,
            uploadedImageUri,
            sport
        } = this.state;

        try {
            const reference = firebase
                .database()
                .ref('/Products/')
                .push({
                    id,
                    pictureName,
                    brand,
                    price,
                    type,
                    size,
                    uploadedImageUri,
                    sport
                });
            Alert.alert("Dit produkt er nu oprettet");

            this.setState({
                id: firebase.auth().currentUser.uid,
                pictureName: '',
                brand: '',
                price: '',
                type: '',
                size: '',
                uploadedImageUri: '',
            });
        } catch (e) {
            Alert.alert(`Error: ${e.message}`);
        }
    };

    componentDidMount() {
        this.updateCameraRollPermission();
        let images;
        AsyncStorage.getItem('images')
            .then(data => {
                images = JSON.parse(data) || [];
                this.setState({
                    images: images
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    updateCameraRollPermission = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({hasCameraPermission: status === 'granted'})
    };

    handleUploadImage = async () => {
        const {image} = this.state;
        const {currentUser} = firebase.auth();
        this.setState({isUploading: true, errorMessage: null});
        try {
            const uploadedImageUrl = await this.uploadImage(image);
            this.handleUploadImageChange(uploadedImageUrl);
            this.setState({isUploading: false, isCompleted: true})
        } catch (e) {
            this.setState({isUploading: false, errorMessage: error.message});
        }
    };

    takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync();
        const {image} = this.state;
        this.setState({lastPhoto: result.uri});
        await this.handleSaveToCameraRoll(result.uri);
        if (!result.cancelled) {
            this.handleSaveToCameraRoll(result.uri)
                .then(() => {
                    Alert.alert("Billedet er gemt")
                })
                .catch((error) => {
                    Alert.alert(error);
                });
        }
    };

    handleSaveToCameraRoll = async uri => {
        console.log(1);
        try {
            const result = await CameraRoll.saveToCameraRoll(uri, 'photo');
        } catch (e) {
            console.log(e);
        }
    };

    uploadImage = async (uri) => {
        const {currentUser} = firebase.auth();
        const {pictureName} = this.state;
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase
            .storage()
            .ref()
            .child('images/' + currentUser.uid + '/' + pictureName);
        await ref.put(blob);
        const uploadedImageUrl = await ref.getDownloadURL();
        return uploadedImageUrl;
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });
        this.setState({image: result.uri});
    };

    render() {
        const {
            pictureName,
            brand,
            price,
            type,
            size,
            image,
            isCompleted,
            isUploading,
            errorMessage,
            sport
        } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.header}>
                        Opret dit produkt
                    </Text>
                </View>
                <KeyboardAvoidingView>
                    <Text> Produkt brand </Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"Indtast brand"}
                        value={brand}
                        onChangeText={this.handleBrandChange}
                        returnKeyType="go"
                        autoCapitalize="false"
                        autoCorrect={false}
                    />
                </KeyboardAvoidingView>
                <View>
                    <Text> Produkt pris </Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"Indtast pris i DKK"}
                        value={price}
                        onChangeText={this.handlePriceChange}
                        returnKeyType="go"
                        autoCapitalize="false"
                        autoCorrect={false}
                    />
                </View>
                <View>
                    <Text> Produkt type </Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"Indtast type fx. t-shirt, sweatshirt osv."}
                        value={type}
                        onChangeText={this.handleTypeChange}
                        returnKeyType="go"
                        autoCapitalize="false"
                        autoCorrect={false}
                    />
                </View>
                <View>
                    <Text> Produkt størrelse </Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"Indtast størrelse fx. M, L osv."}
                        value={size}
                        onChangeText={this.handleSizeChange}
                        returnKeyType="go"
                        autoCapitalize="false"
                        autoCorrect={false}
                    />
                </View>
                <View>
                    <Text> Billedenavn </Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"Indtast størrelse fx. M, L osv."}
                        value={pictureName}
                        onChangeText={this.handlePictureNameChange}
                        returnKeyType="go"
                        autoCapitalize="false"
                        autoCorrect={false}
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={sport}
                        style={{height: 50, width: 150}}
                        onValueChange={(itemValue, itemIndex) => this.handleChangeSport(itemValue)}
                    >
                        <Picker.Item label="Fodbold" value="Fodbold"/>
                        <Picker.Item label="Tennis" value="Tennis"/>
                        <Picker.Item label="Svømning" value="Svømning"/>
                        <Picker.Item label="Håndbold" value="Håndbold"/>
                        <Picker.Item label="Volleyball" value="Volleyball"/>
                        <Picker.Item label="Dans" value="Dans"/>
                        <Picker.Item label="Ishockey" value="Ishockey"/>
                        <Picker.Item label="Basketball" value="Basketball"/>
                        <Picker.Item label="Badminton" value="Badminton"/>

                    </Picker>
                </View>
                <View>
                    <Buttons onPress={this.takePhoto} text={"Tag billede"}/>
                </View>

                <View>
                    <Buttons onPress={this.pickImage} text={"Vælg billede"}/>
                    {image && (
                        <View>
                            <Image source={{uri: image}} style={styles.image}/>
                            <Buttons
                                disabled={isUploading}
                                text={"Upload"}
                                onPress={this.handleUploadImage}/>
                        </View>
                    )}
                    {isUploading && <ActivityIndicator/>}
                    {isCompleted && <Text>Billedet er nu vedhæftet produktet</Text>}
                    {errorMessage && <Text> {errorMessage} </Text>}
                </View>

                <View>
                    <Buttons onPress={this.handleSave} text={"Opret produkt"}/>
                </View>
            </ScrollView>
        )
    }
}


const containerStyle = {
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        margin: 24,
        fontSize: 30,
        fontFamily: 'Georgia',
        fontStyle: 'italic',
        textAlign: 'center',

    },
    searchInput: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    dropDown: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        marginBottom: 20,
        borderWidth: 1
    },
    label2: {
        fontWeight: 'bold',
        width: 100,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    btnPressStyle:{
        backgroundColor:'#0080ff',
        height: 50,
        width: width - 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt:{
        color: '#ffffff'
    },
    itemImage: {
        backgroundColor: '#2F455C',
        height: 150,
        width: width - 60,
        borderRadius: 8,
        resizeMode: 'contain'
    },
    root:{
        flex: 2,
        marginTop: 50,
        marginBottom: 50,
        alignItems: 'center'
    },
    label: { fontWeight: 'bold', width: 100 },
    input: {flex: 1 },
});



