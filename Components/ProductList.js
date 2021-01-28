import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import firebase, {database} from 'firebase';
import Row, {Separator} from './Row';
import Carousel from 'react-native-snap-carousel';
import Slider from 'react-native-flatlist-slider';

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
            .limitToFirst(3)
            .on('value', snapshot => {
                this.setState({products: snapshot.val()});
            });
    }

    handleChangeProducts = () => {
    }


    //Vi opretter en metode der navigere os til det
    handleSelectProduct = id => {
        this.props.navigation.navigate('ProductDetails', {id});
    };


    _renderItem = ({item, index}) => {
        const {products} = this.state;

        //Opretter array til vores flatlist
        const productArray = Object.values(products);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const productKeys = Object.keys(products);
        return(

        <View>
            <FlatList
                data={productArray}
                keyExtractor={(item, index) => productKeys[index]}
                maxToRenderPerBatch={5}
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
        </View>

        )
    };


    render() {
        const {products} = this.state;

        if (!products) {
            return <Text> Der er ingen produkter at exploere endnu </Text>;
        }
        //Opretter array til vores flatlist
        const productArray = Object.values(products);


        //Returnerer flatlist sammen med list item, som gør at når vi trykker på dem at der sker noget
        return (
            <View>
            <Text style={styles.header}> Fodbold </Text>

            <Carousel layout={'stack'}
            data={productArray}
            renderItem={this._renderItem}
            sliderWidth={400}
            itemWidth={450}
            autoplayInterval={1}
            />
            </View>
        );
    }
}
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
})