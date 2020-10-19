import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Linking,
    FlatList,
    Button,
    Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';


export default class CameraComponent extends React.Component {
    cameraRef = React.createRef();
    state = {
        hasCameraPermission: null,
        cameraPosition:Camera.Constants.Type.front,
    };

    componentDidMount() {
        this.updateCameraPermission();
    }

    /*Få adgang til kamera*/
    updateCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    /*Tag et billde*/
    handleTakePhoto = async () => {
        if (!this.cameraRef.current) {
            return;
        }
        const result = await this.cameraRef.current.takePictureAsync();
        this.setState({ lastPhoto: result.uri });
        this.handleSaveToCameraRoll(this.state.lastPhoto)
    };

    // Gem billedet i galleriet
    handleSaveToCameraRoll = async uri => {
        try {
            await MediaLibrary.createAssetAsync(uri, 'photo');

        } catch (error) {
            console.error(error);
        }
    };


    /*Gå til indstillinger og få permission*/
    handleSettingLink = () =>{
        Linking.openSettings()
    };



    renderCameraView() {
        const { hasCameraPermission, type } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        }
        if (hasCameraPermission === false) {
            return (
                <View>
                    <Text>Du har ikke adgang til kamera.</Text>
                    <Button onPress={this.handleSettingLink} title='Get permissions to access camera'> </Button>
                </View>
            );
        }
        return (
            <View>
                <Camera
                    style={styles.cameraView}
                    type={this.state.cameraPosition}
                    ref={this.cameraRef}>
                </Camera>
                <Button style={styles.btn} title="Take photo" onPress={this.handleTakePhoto} />
            </View>
        );
    }

    /*Main renderr*/
    render() {

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.cameraContainer}>{this.renderCameraView()}</View>
            </SafeAreaView>);
    }
}

const containerStyle = {
    padding: 5,
    borderRadius: 1,
    margin: 4,
    borderWidth: 1,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    btn:{
        margin:100
    },
    Flatlist_render:{
        width:'100%'
    },
    cameraContainer: {
        // Her pakkes fælles style ud
        ...containerStyle,
        backgroundColor: '#DDF',

    },
    cameraView: {
        marginTop: 100,
        marginLeft: 10,
        marginBottom:15,
        aspectRatio: 1.2,
        width: '100%',
        height: 270
    },
    lastPhotoContainer: {
        backgroundColor: '#DFF',
        width: '100%',
        height: 130,
        margin: 0
    },
    galleryContainer: {
        ...containerStyle,
        backgroundColor: '#FDF',
        marginBottom: 100
    },
    thumbnail: {
        width: 110,
        height: 110,
        marginLeft: 140
    },thumbnail2: {
        width: 200,
        height: 200,
        margin: 10,
    },
    FlatList_image:{
        width: 200,
        height: 200,
        margin: 5
    },
    galleryView: {
        height: 150,
        width: '100%',
        flexDirection: 'row',
    },
});

