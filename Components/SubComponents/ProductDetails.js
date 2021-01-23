import * as React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Platform, Alert, ImageBackground, ScrollView,
    SafeAreaView, Image } from 'react-native';
import firebase from 'firebase';
import _ from 'lodash';
import {LogBox} from "react-native";
import {Buttons} from "../Buttons";

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

export default class ProductDetails extends React.Component {

    _isMounted = false;

    state = {
        products: null,
        profileImageUrl: ''
    };

    //Vi får id fra det produkt der er blevet trykket på og loader det fra firebase endpoint
    componentDidMount() {
        this._isMounted = true;
        const id = this.props.navigation.getParam('id');


        if (this._isMounted) {
            this.loadProduct(id)
        }

    }

    loadProduct = id => {
        firebase
            .database()
            .ref('/Products/' + id)
            .on('value', dataObject => {
                this.setState({products: dataObject.val()});
            });
    };

    handleEdit = () => {
        const {navigation} = this.props;
        const id = navigation.getParam('id');
        //Navigerer til klassen EditProduct med tilhørende id
        this.props.navigation.navigate('EditProduct', {id});
    };
    confirmDelete = () => {
        //Hvis platform er lig med ios eller android får vi en alert.
        //Derfor hvis det er computer vil den ikke gå ind i denne metode
        if (Platform.OS === 'ios' || Platform.OS === 'android') {
            Alert.alert('Are you sure?', 'Do you want to delete the product?', [
                {text: 'Cancel', style: 'cancel'},
                // Vi bruger this.handleDelete som eventHandler til onPress
                {text: 'Delete', style: 'destructive', onPress: this.handleDelete},
            ]);
        } else {
            if (confirm('Er du sikker på du vil slette dette produkt?')) {
                this.handleDelete()
            }
        }
    };

    handleDelete = () => {
        const {navigation} = this.props;
        const id = navigation.getParam("id");
        try {
            firebase
                .database()
                .ref(`/Products/${id}`)
                .remove();

            navigation.goBack();
        } catch (e) {
            Alert.alert(e.message);
        }
    };

    render() {
        //HVis der er et product skal den returnere nedenståe views og buttons
        const {products} = this.state;
        if (!products) {
            return (
                <Text>
                    No Product
                </Text>
            )
        }
        let imageRef = firebase.storage().ref('/images/' + products.id + '/' + products.pictureName);
        imageRef
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                this.setState({profileImageUrl: url});
                console.log(url)
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));

        return (
            <SafeAreaView>
            <ScrollView>
                <View>
                    <ImageBackground
                        source={{uri: this.state.profileImageUrl}}
                        style={{width: '100%', height: 270}}
                    />
                </View>

                <View>
                    <Text>Beskrivelse</Text>
                    <Text>{products.brand}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Brand </Text>
                    <Text style={styles.value}> {products.brand} </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Size </Text>
                    <Text style={styles.value}> {products.size} </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Price </Text>
                    <Text style={styles.value}> {products.price} </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Type </Text>
                    <Text style={styles.value}> {products.type} </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Billede navn </Text>
                    <Text style={styles.value}> {products.pictureName} </Text>
                </View>
                <View style={styles.row}>
                    <Buttons text="Edit" onPress={this.handleEdit}/>
                    <Buttons text="Delete" onPress={this.confirmDelete}/>
                </View>
            </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
    img: {
        width: 100,
        height: 200
    },
});
