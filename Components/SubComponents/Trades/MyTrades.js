import React, {Component} from 'react';
import {Button, StyleSheet, View, Image, Text, FlatList} from 'react-native';
import firebase from "firebase";
import Row, {Separator} from "../../Row";


//Denne komponent viser alle ens egne oprettede produkter



//Vi eksporterer vores kompnent
export default class MyTrades extends Component{


    //Vi opretter nogle states
    state = {
        products: {},
    };

    //Vi istantiere dataen på vores endpoint i firebase
    componentDidMount() {

        const {currentUser} = firebase.auth();
        firebase
            .database()
            .ref('/Products')
            .orderByChild('/id')
            .equalTo(currentUser.uid)
            .on('value', snapshot => {
                this.setState({products: snapshot.val()});
            });
    }

    //Vi opretter en funktion til at handle state chagne
    handleSelectProduct = id => {
        this.props.navigation.navigate('ProductDetails', {id});
    };


    //Vi opretter en render funktion som returnerer alle vores produkter i en flatlist
    render() {
        const {products} = this.state;

        if (!products) {
            return <Text> Du skal være logget ind eller have oprettet et produkt </Text>;
        }
        //Opretter array til vores flatlist
        const productArray = Object.values(products);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const productKeys = Object.keys(products);

        return (
            <FlatList
                data={productArray}
                keyExtractor={(item, index) => productKeys[index]}
                renderItem={({item, index}) => {
                    const name = `${item.brand}`;
                    const price = `${item.price}`;
                    const image = `${item.uploadedImageUri}`;
                    return (
                        <Row
                            title={name}
                            price={price}
                            Photo={{uri: image}}
                            id={productKeys[index]}
                            onSelect={this.handleSelectProduct}
                        />
                    );
                }}
                ItemSeparatorComponent={Separator}
                ListHeaderComponent={() => <Separator/>}
                ListFooterComponent={() => <Separator/>}
                contentContainerStyle={{paddingVertical: 20}}
            />
        );
    }
}

