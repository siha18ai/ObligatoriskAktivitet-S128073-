import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Row, {Separator} from './Row';

import ProductListItem from './SubComponents/ProductListItem';

export default class ProductList extends React.Component {
    //Sætter products til at være et state så vi kan give den værdier
    state = {
        products: {},
    };

    //Vi istantiere dataen på vores endpoint i firebase
    componentDidMount() {
        const {currentUser} = firebase.auth();
        firebase
            .database()
            .ref('/Products')
            .on('value', snapshot => {
                this.setState({products: snapshot.val()});
            });
    }


    //Vi opretter en metode der navigere os til det
    handleSelectProduct = id => {
        this.props.navigation.navigate('ProductDetails', {id});
    };


    render() {
        const {products} = this.state;

        if (!products) {
            return <Text> Der er ingen produkter at exploere endnu </Text>;
        }
        //Opretter array til vores flatlist
        const productArray = Object.values(products);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const productKeys = Object.keys(products);

        //Returnerer flatlist sammen med list item, som gør at når vi trykker på dem at der sker noget
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