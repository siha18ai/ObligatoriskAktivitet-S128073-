import React, {Component} from 'react';
import {Button, StyleSheet, View, Image, Text, FlatList} from 'react-native';
import { Container, Header, Title, Content, Icon, Left, Right, Body} from "native-base";
import InboxContent from "../Inbox/Inbox";
import firebase from "firebase";
import Row, {Separator} from "../../Row";


export default class MyTrades extends Component{
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

    handleSelectProduct = id => {
        this.props.navigation.navigate('ProductDetails', {id});
    };

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

