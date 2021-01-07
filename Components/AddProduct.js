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
    Image
} from 'react-native';
import firebase from 'firebase';
import {Body, Container, Header, Title, ActionSheet, Root} from "native-base";
import {Buttons} from "./Buttons";
import {TextField} from "./Form";
import * as ImagePicker from 'expo-image-picker';
import {setSelectedLog} from "react-native/Libraries/LogBox/Data/LogBoxData";

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent:'center'
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

export default class AddProduct extends React.Component {
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

        if(permission.granted == false){
            return;
        }
        let picker = await ImagePicker.launchCameraAsync();

        if(picker.cancelled == true){
            return;
        }
        this.handleSelectedImage({localUri:picker.uri});
        this.onSelectedImage(this.selectedImage);
        console.log(picker)
    };
    openImage = async () => {
        let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(permission.granted == false){
            return;
        }
        let picker = await ImagePicker.launchImageLibraryAsync();

        if(picker.cancelled == true){
            return;
        }
        this.handleSelectedImage({localUri:picker.uri});
        this.onSelectedImage(this.selectedImage);
        console.log(picker)
    };
    onClickAddImage = () => {
        const BUTTONS = ['Take Photo', 'Choose Photo Library', 'C' +
        'ancel'];
        ActionSheet.show(
            {options: BUTTONS,
                cancelButtonIndex: 2,
                title: 'Select a Photo'},
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

    //Vi sætter de forskellige attributter i state til at kunne ændres
    state = {
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

    //
    handleSave = () => {
        const {brand, size, price, type} = this.state;
        try {
            //Vi sætter de nye værdier op i firebase
            const reference = firebase
                .database()
                .ref('/Products/')
                .push({brand, size, price, type});
            Alert.alert('Saved');
            this.setState({
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
        return(
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

    /*
    render() {
        let {fileList} = this.state;
        let {content, btnPressStyle, txt, root} = styles;

        //returnerer siden hvor brugeren kan indtaste værdier
        const {brand, size, price, type} = this.state;
        const [image, setImage] = useState(null);

        return(

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
                    contentContainerStyle={{ paddingVertical: 20 }}
                    style={{ backgroundColor: "#fff"}}>
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

