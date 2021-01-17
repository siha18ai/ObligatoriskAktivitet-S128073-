import * as React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Platform, Alert, ImageBackground, ScrollView, SafeAreaView } from 'react-native';
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

    state = {product: null};

    //Vi får id fra det produkt der er blevet trykket på og loader det fra firebase endpoint
    componentDidMount() {
        const id = this.props.navigation.getParam('id');

        this.loadProduct(id)

    }

    loadProduct = id => {
        firebase
            .database()
            .ref('/Products/' + id)
            .on('value', dataObject => {
                this.setState({product: dataObject.val()});
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
        const {product} = this.state;
        if (!product) {
            return (
                <Text>
                    No Product
                </Text>
            )
        }
        const Photo = this.props

        return (
            <SafeAreaView>
            <ScrollView>
                <View>
                    <ImageBackground
                        source={Photo}
                        style={{width: '100%', height: 270}}
                        imageStyle={{borderBottomEndRadius: 65}}
                    >
                    </ImageBackground>
                </View>
                <View>
                    <Text>Beskrivelse</Text>
                    <Text>{product.brand}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Brand </Text>
                    <Text style={styles.value}> {product.brand} </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Size </Text>
                    <Text style={styles.value}> {product.size} </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Price </Text>
                    <Text style={styles.value}> {product.price} </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}> Type </Text>
                    <Text style={styles.value}> {product.type} </Text>
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
});
