import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import ProductListItem from './SubComponents/ProductListItem';

export default class ProductList extends React.Component {
    state = {
        products: {},
    };

    componentDidMount() {
        firebase
            .database()
            .ref('/Products')
            .on('value', snapshot => {
                this.setState({ products: snapshot.val() });
            });
    }


    handleSelectProduct = id => {
        this.props.navigation.navigate('ProductDetails', { id } );
    };

    render() {
        const { products } = this.state;

        if (!products) {
            return null;
        }
        const productArray = Object.values(products);

        const productKeys = Object.keys(products);

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