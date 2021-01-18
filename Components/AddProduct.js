
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
    ActivityIndicator
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


    state= {
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
        brand:'',
        price: '',
        type: '',
        size:'',
        imageUri:'',
        uploadedImageUri: null,
    };

    //vi sætter state i de forskellige attributter fra det brugeren har indtastet
    handlePictureNameChange = text => this.setState({pictureName: text});

    handleBrandChange = text => this.setState({brand: text});

    handleSizeChange = text => this.setState({size: text});

    handlePriceChange = text => this.setState({price: text});

    handleTypeChange = text => this.setState({type: text});



    handleSave = () => {
        const {
            id,
            pictureName,
            brand,
            price,
            type,
            size,
            uploadedImageUri
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
                    uploadedImageUri
                });
            Alert.alert("Dit produkt er nu oprettet");

            this.setState({
                id: firebase.auth().currentUser.uid,
                pictureName: '',
                brand:'',
                price: '',
                type: '',
                size: '',
                uploadedImageUri: null
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
            this.setState({uploadedImageUrl});
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
    }

    handleSaveToCameraRoll = async uri => {
        console.log(1);
        try{
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
            .child(`images/${currentUser.uid}/${pictureName}`);
        await ref.put(blob);
        const uploadedImageUrl = await ref.getDownloadURL();
        return uploadedImageUrl;
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });
        this.setState({ image: result.uri });
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
            uploadedImageUri,
        } = this.state;
        return(
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
                        value={`${brand}${type}`}
                        onChangeText={this.handlePictureNameChange}
                        returnKeyType="go"
                        autoCapitalize="false"
                        autoCorrect={false}
                    />
                </View>
                    <View>
                        <TouchableOpacity onPress={this.takePhoto}>
                            <Text> Tag billede </Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.pickImage}>
                            <Text> Vælg billede </Text>
                        </TouchableOpacity>
                        {image && (
                            <View>
                                <Image source={{ uri: image}} style={styles.image}/>
                                <Button
                                    disabled={isUploading}
                                    title="Upload"
                                    onPress={this.handleUploadImage} />
                            </View>
                        )}
                        {isUploading && <ActivityIndicator/>}
                        {isCompleted && <Text>Billedet er nu vedhæftet produktet</Text>}
                        {errorMessage && <Text> {errorMessage} </Text>}
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.handleSave}>
                            <Text> Opret produkt </Text>
                        </TouchableOpacity>
                    </View>

            </ScrollView>
        )
    }


    /*
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
        }
    }


    onSelectedImage = (image) => {
        let newDataImg = this.state.fileList;
        const source = {uri: image.path};
        let item = {
            id: Date.now(),
            url: source,
            content: image.data
        };
        newDataImg.push(item);
        this.setState({fileList: newDataImg})
    };

    openCamera = async () => {
        let permission = await ImagePicker.requestCameraPermissionsAsync();

        if (permission.granted == false) {
            return;
        }
        let picker = await ImagePicker.launchCameraAsync();

        if (picker.cancelled == true) {
            return;
        }
        this.handleSelectedImage({localUri: picker.uri});
        this.onSelectedImage(this.selectedImage);
        console.log(picker)
    };


    openImage = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permission.granted == false) {
            Alert("Permission to access camera is required");
            return;
        }

            let picker = await ImagePicker.launchImageLibraryAsync();
            console.log(picker);
/*
        if (picker.cancelled == true) {
            return;
        }


 */
/*
            this.handleSelectedImage({localUri: picker.uri});
            this.onSelectedImage(this.selectedImage);
            console.log(picker)

    };
    onClickAddImage = () => {
        const BUTTONS = ['Take Photo', 'Choose Photo Library', 'C' +
        'ancel'];
        ActionSheet.show(
            {
                options: BUTTONS,
                cancelButtonIndex: 2,
                title: 'Select a Photo'
            },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0:
                        this.openCamera();
                        break;
                    case 1:
                        this.openImage();
                        break;
                    default:
                        break;
                }
            }
        )
    };


    addImage = async () => {
        const {imageName, uploadUri} = this.state;
        firebase
            .storage()
            .ref(imageName)
            .put(uploadUri)
            .then((snapshot) => {
                console.log(`${imageName} has been successfully uploaded.`);
            })
            .catch((e) => console.log('uploading image error =>', e));

    }


    //Vi sætter de forskellige attributter i state til at kunne ændres
    state = {
        id: firebase.auth().currentUser.uid,
        brand: '',
        size: '',
        price: '',
        type: '',
        selectedImage: null,
    };

    //vi sætter state i de forskellige attributter fra det brugeren har indtastet
    handleBrandChange = text => this.setState({brand: text});

    handleSizeChange = text => this.setState({size: text});

    handlePriceChange = text => this.setState({price: text});

    handleTypeChange = text => this.setState({type: text});

    handleSelectedImage = image => this.setState({selectedImage: image});

    handleSave = () => {
        const {id, brand, size, price, type} = this.state;
        try {
            //Vi sætter de nye værdier op i firebase
            const reference = firebase
                .database()
                .ref('/Products/')
                .push({id, brand, size, price, type});
            Alert.alert('Saved');
            this.setState({
                id: firebase.auth().currentUser.uid,
                brand: '',
                size: '',
                price: '',
                type: '',
            });


        } catch (error) {
            Alert.Alert(`Error: ${error.message}`);
        }
    };
    renderItem = ({item, index}) => {
        return (
            <View>
                <Image source={item.url} style={styles.itemImage}/>
            </View>
        )
    };

    render() {
        let {fileList} = this.state;
        let {content, btnPressStyle, txt, root, itemImage} = styles;
        return (
            <Container style={styles.container}>
                <Header>
                    <Body>
                        <Title> Tilføj produkt </Title>
                    </Body>
                </Header>
                <Root style={root}>
                    <View style={content}>
                        <FlatList
                            data={fileList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state}
                        />
                        <TouchableOpacity style={btnPressStyle} onPress={this.onClickAddImage}>
                            <Text style={txt}>Press Add Image</Text>
                        </TouchableOpacity>
                    </View>
                </Root>
            </Container>
        )
    }
*/
/*
    render() {
        let {fileList} = this.state;
        let {content, btnPressStyle, txt, root} = styles;

        //returnerer siden hvor brugeren kan indtaste værdier
        const {brand, size, price, type} = this.state;
        const [image, setImage] = useState(null);

        return (

            <Container style={styles.container}>
                <Header>
                    <Body>
                        <Title> Tilføj produkt </Title>
                    </Body>
                </Header>
                <Root style={root}>
                    <View style={content}>
                        <FlatList
                            data={fileList}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state}
                        />
                        <TouchableOpacity style={btnPressStyle} onPress={alert("To do")}>
                            <Text style={txt}>Press Add Image</Text>
                        </TouchableOpacity>
                    </View>
                </Root>
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        contentContainerStyle={{paddingVertical: 20}}
                        style={{backgroundColor: "#fff"}}>
                        <View style={styles.row}>
                            <Text style={styles.label}> Brand </Text>
                            <TextField
                                value={brand}
                                onChangeText={this.handleBrandChange}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}> Price </Text>
                            <TextField
                                value={price}
                                onChangeText={this.handlePriceChange}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}> Type </Text>
                            <TextField
                                value={type}
                                onChangeText={this.handleTypeChange}/>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}> Size </Text>
                            <TextField
                                value={size}
                                onChangeText={this.handleSizeChange}/>
                        </View>
                    </ScrollView>
                    <Buttons
                        text="Add product"
                        onPress={this.handleSave}
                        style={{marginBottom: 20}}
                    />
                </SafeAreaView>
            </Container>
        )
    }
*/
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
      margin: 8,
      paddingHorizontal: 100,
      backgroundColor: '#ccffff',
        borderRadius: 10,
        padding: 12,
        justifyContent: 'center',
        textAlign: 'center',
    },
    dropDown: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
        marginBottom: 20
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



