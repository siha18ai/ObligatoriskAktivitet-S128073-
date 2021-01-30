import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet, Picker} from 'react-native';
import firebase, {database} from 'firebase';
import Row, {Separator} from './Row';
import Carousel from 'react-native-snap-carousel';

import ProductListItem from './SubComponents/ProductListItem';
import Product from "./Product";


export default class ProductList extends React.Component {
    //Sætter products til at være et state så vi kan give den værdier
    state = {
        fodboldProducts: {},
        tennisProducts: {},
        svømningProducts: {},
        håndboldProducts: {},
        volleyballProducts: {},
        dansProducts: {},
        ishockeyProducts: {},
        basketBallProducts: {},
        badmintonProducts: {},
        alleProdukter: {},
        productsTilAfhandling: {},
        id: firebase.auth().currentUser.uid
    };
    //Vi istantiere dataen på vores endpoint i firebase
    componentDidMount() {
        firebase
            .database()
            .ref('/Products')
            .orderByChild('/sport')
            .equalTo('fodbold')
            .on('value', snapshot => {
                this.setState({fodboldProducts: snapshot.val()});
            });
        firebase
            .database()
            .ref('/Products')
            .orderByChild('/sport')
            .equalTo('tennis')
            .on('value', snapshot => {
                this.setState({tennisProducts: snapshot.val()});
            });
        firebase
            .database()
            .ref('/Products')
            .orderByChild('/sport')
            .equalTo('Svømning')
            .on('value', snapshot => {
                this.setState({svømningProducts: snapshot.val()});
            });
        firebase
            .database()
            .ref('/Products')
            .orderByChild('/sport')
            .equalTo('Håndbold')
            .on('value', snapshot => {
                this.setState({håndboldProducts: snapshot.val()});
            });
        firebase
            .database()
            .ref('/Products')
            .orderByChild('/sport')
            .equalTo('Volleyball')
            .on('value', snapshot => {
                this.setState({volleyballProducts: snapshot.val()});
            });
        firebase
            .database()
            .ref('/Products')
            .orderByChild('/sport')
            .equalTo('Dans')
            .on('value', snapshot => {
                this.setState({dansProducts: snapshot.val()});
            });
        firebase
            .database()
            .ref('/Products')
            .orderByChild('/sport')
            .equalTo('Ishockey')
            .on('value', snapshot => {
                this.setState({ishockeyProducts: snapshot.val()});
            });
        firebase
            .database()
            .ref('/Products')
            .orderByChild('/sport')
            .equalTo('Basketball')
            .on('value', snapshot => {
                this.setState({basketBallProducts: snapshot.val()});
            });
        firebase
            .database()
            .ref('/Products')
            .orderByChild('/sport')
            .equalTo('Badminton')
            .on('value', snapshot => {
                this.setState({badmintonProducts: snapshot.val()});
            });
    }


    //Vi opretter en metode der navigere os til det
    handleSelectProduct = id => {
        console.log("ID productlist: " + id);
        this.props.navigation.navigate('ProductDetails', {id});
    };

    render() {
        const {fodboldProducts,
            tennisProducts,
            svømningProducts,
            håndboldProducts,
            volleyballProducts,
            dansProducts,
            ishockeyProducts,
            basketBallProducts,
            badmintonProducts} = this.state;

        if(!fodboldProducts || !tennisProducts|| !svømningProducts|| !håndboldProducts|| !volleyballProducts|| !dansProducts|| !ishockeyProducts|| !basketBallProducts|| !badmintonProducts){
            return <Text> Loading products </Text>
        }

        //Opretter array til vores flatlist
        const fodboldProductsArray = Object.values(fodboldProducts);
        const fodboldProductsKeys = Object.keys(fodboldProducts);

        const tennisProductsArray = Object.values(tennisProducts);
        const tennisProductsKeys = Object.keys(tennisProducts);

        const svømningArray = Object.values(svømningProducts);
        const svømingKeys = Object.values(svømningProducts);

        const håndboldArray = Object.values(håndboldProducts);
        const håndboldKeys = Object.values(håndboldProducts);

        const volleyballArray = Object.values(volleyballProducts);
        const volleyballKeys = Object.values(volleyballProducts);

        const dansArray = Object.values(dansProducts);
        const dansKeys = Object.values(dansProducts);

        const ishockeyArray = Object.values(ishockeyProducts);
        const ishockeyKeys = Object.values(ishockeyProducts);

        const basketBallPArray = Object.values(basketBallProducts);
        const basketBallPKeys = Object.values(basketBallProducts);

        const badmintonArray = Object.values(badmintonProducts);
        const badmintonKeys = Object.values(badmintonProducts);


        //Returnerer flatlist sammen med list item, som gør at når vi trykker på dem at der sker noget
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.view2}>
                        <Text style={styles.header}> Fodbold </Text>
                        <Carousel
                            data={fodboldProductsArray}
                            keyExtractor={(item, index) => fodboldProductsKeys[index]}
                            renderItem={({item, index}) => {
                                const name = `${item.brand}`;
                                const price = `${item.price}`;
                                const image = `${item.uploadedImageUri}`;
                                return (
                                    <Product
                                        title={name}
                                        price={price}
                                        Photo={{uri: image}}
                                        id={fodboldProductsKeys[index]}
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
                    <View style={styles.view2}>
                        <Text style={styles.header}> Tennis </Text>
                        <Carousel
                            data={tennisProductsArray}
                            keyExtractor={(item, index) => tennisProductsKeys[index]}
                            renderItem={({item, index}) => {
                                const name = `${item.brand}`;
                                const price = `${item.price}`;
                                const image = `${item.uploadedImageUri}`;
                                return (
                                    <Product
                                        title={name}
                                        price={price}
                                        Photo={{uri: image}}
                                        id={tennisProductsKeys[index]}
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
                    <View style={styles.view2}>
                        <Text style={styles.header}> Svømning </Text>
                        <Carousel
                            data={svømningArray}
                            keyExtractor={(item, index) => svømingKeys[index]}
                            renderItem={({item, index}) => {
                                const name = `${item.brand}`;
                                const price = `${item.price}`;
                                const image = `${item.uploadedImageUri}`;
                                return (
                                    <Product
                                        title={name}
                                        price={price}
                                        Photo={{uri: image}}
                                        id={tennisProductsKeys[index]}
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
                    <View style={styles.view2}>
                        <Text style={styles.header}> Håndbold </Text>
                        <Carousel
                            data={håndboldArray}
                            keyExtractor={(item, index) => håndboldKeys[index]}
                            renderItem={({item, index}) => {
                                const name = `${item.brand}`;
                                const price = `${item.price}`;
                                const image = `${item.uploadedImageUri}`;
                                return (
                                    <Product
                                        title={name}
                                        price={price}
                                        Photo={{uri: image}}
                                        id={tennisProductsKeys[index]}
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
                    <View style={styles.view2}>
                        <Text style={styles.header}> Volleyball </Text>
                        <Carousel
                            data={volleyballArray}
                            keyExtractor={(item, index) => volleyballKeys[index]}
                            renderItem={({item, index}) => {
                                const name = `${item.brand}`;
                                const price = `${item.price}`;
                                const image = `${item.uploadedImageUri}`;
                                return (
                                    <Product
                                        title={name}
                                        price={price}
                                        Photo={{uri: image}}
                                        id={tennisProductsKeys[index]}
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
                    <View style={styles.view2}>
                        <Text style={styles.header}> Dans </Text>
                        <Carousel
                            data={dansArray}
                            keyExtractor={(item, index) => dansKeys[index]}
                            renderItem={({item, index}) => {
                                const name = `${item.brand}`;
                                const price = `${item.price}`;
                                const image = `${item.uploadedImageUri}`;
                                return (
                                    <Product
                                        title={name}
                                        price={price}
                                        Photo={{uri: image}}
                                        id={tennisProductsKeys[index]}
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
                    <View style={styles.view2}>
                        <Text style={styles.header}> Ishockey </Text>
                        <Carousel
                            data={ishockeyArray}
                            keyExtractor={(item, index) => ishockeyKeys[index]}
                            renderItem={({item, index}) => {
                                const name = `${item.brand}`;
                                const price = `${item.price}`;
                                const image = `${item.uploadedImageUri}`;
                                return (
                                    <Product
                                        title={name}
                                        price={price}
                                        Photo={{uri: image}}
                                        id={tennisProductsKeys[index]}
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
                    <View style={styles.view2}>
                        <Text style={styles.header}> BasketBall </Text>
                        <Carousel
                            data={basketBallPArray}
                            keyExtractor={(item, index) => basketBallPKeys[index]}
                            renderItem={({item, index}) => {
                                const name = `${item.brand}`;
                                const price = `${item.price}`;
                                const image = `${item.uploadedImageUri}`;
                                return (
                                    <Product
                                        title={name}
                                        price={price}
                                        Photo={{uri: image}}
                                        id={tennisProductsKeys[index]}
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
                    <View style={styles.view2}>
                        <Text style={styles.header}> Badminton </Text>
                        <Carousel
                            data={badmintonArray}
                            keyExtractor={(item, index) => badmintonKeys[index]}
                            renderItem={({item, index}) => {
                                const name = `${item.brand}`;
                                const price = `${item.price}`;
                                const image = `${item.uploadedImageUri}`;
                                return (
                                    <Product
                                        title={name}
                                        price={price}
                                        Photo={{uri: image}}
                                        id={tennisProductsKeys[index]}
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
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        margin: 24,
        fontSize: 30,
        fontFamily: 'Georgia',
        fontStyle: 'italic',
        textAlign: 'center',

    },
    view1: {
        flex: 3,
        justifyContent: 'space-around'
    },
    view2: {
        flex: 1,
        justifyContent: 'space-around'
    }
});