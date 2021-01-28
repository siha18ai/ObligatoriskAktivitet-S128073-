import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import firebase, {database} from 'firebase';
import Row, {Separator} from './Row';
import Carousel from 'react-native-snap-carousel';

import ProductListItem from './SubComponents/ProductListItem';


export default class ProductList extends React.Component {
    //Sætter products til at være et state så vi kan give den værdier
    state = {
        products: {},
        productsTilAfhandling: {},
        activeSlide: 0,
    };

    //Vi istantiere dataen på vores endpoint i firebase
    componentDidMount() {
        console.log("ComponentDidMount: " + this.state.activeSlide);
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
        const nummer = this.state.activeSlide;

        if (!products) {
            return <Text> Der er ingen produkter at exploere endnu </Text>;
        }
        //Opretter array til vores flatlist
        const productArray = Object.values(products);

        const productKeys = Object.keys(products);


        //Returnerer flatlist sammen med list item, som gør at når vi trykker på dem at der sker noget
        return (
            <View>
                <Text style={styles.header}> Fodbold </Text>

                <Carousel
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
                        contentContainerStyle={{paddingVertical: 20}
                        }
                    loop={false}
                    layout={'tinder'}
                    enableSnap={true}
                    loopClonesPerSide={3}
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