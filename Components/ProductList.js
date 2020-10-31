import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import ProductListItem from './SubComponents/ProductListItem';

export default class ProductList extends React.Component {
    //Sætter products til at være et state så vi kan give den værdier
    state = {
        products: {}
    };

    //Vi istantiere dataen på vores endpoint i firebase
    componentDidMount() {
        firebase
            .database()
            .ref('/Products')
            .on('value', snapshot => {
                this.setState({ products: snapshot.val() });
            });
    }


    //Vi opretter en metode der navigere os til det
    handleSelectProduct = id => {
        this.props.navigation.navigate('ProductDetails', { id } );
    };

    render() {
        const { products } = this.state;

        if (!products) {
            return <Text> Du skal være logget ind eller have oprettet et produkt </Text>;
        }
        //Opretter array til vores flatlist
        const productArray = Object.values(products);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const productKeys = Object.keys(products);

        //Returnerer flatlist sammen med list item, som gør at når vi trykker på dem at der sker noget
        return (
            <View>
                <FlatList
                    data={productArray}
                    keyExtractor={(item, index) => productKeys[index]}
                    renderItem={({ item, index }) => (
                        <ProductListItem
                            product={item}
                            id={productKeys[index]}
                            onSelect={this.handleSelectProduct}
                        />
                    )}
                />
            </View>
        );
    }
}