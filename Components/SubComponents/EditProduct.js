import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase';


//Denne kompnent returnerer en side hvor man kan ændre sig produkt


//Styels
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: { fontWeight: 'bold', width: 100 },
    input: { borderWidth: 1, flex: 1 },
});


//Vi eksporterer vores komponent
export default class EditProduct extends React.Component{


    //Vi opretter nogle states
    state = {
        brand: '',
        size: '',
        price: '',
        type: '',
    };


    //Vi kalder på componentDidMount der excecutor en funktion
    componentDidMount() {
        const id = this.props.navigation.getParam("id");

        this.loadProduct(id);

    }


    //Vi loader produktet som er trykket på
    loadProduct = id => {
        //Kalder firebase endpoint og fanger data
        firebase
            .database()
            .ref('/Products/'+id)
            .on('value', dataObject => {
                const product = dataObject.val();
                const { brand, size, price, type } = product;
                this.setState({ brand, size, price, type });
            });
    };


    //Vi laver diverse handle funktioner til at ændre state
    handleBrandChange = text => this.setState({brand: text});
    handleSizeChange = text => this.setState({size: text});
    handlePriceChange = text => this.setState({price: text});
    handleTypeChange = text => this.setState({type: text});


    //Denne funktion håndterer ændringer i voers produkt og opdaterer det i databasen
    updateData = () => {
        const {navigation} = this.props;
        const {brand, size, price, type} = this.state;
        const id = navigation.getParam("id");
        try {
            firebase
                .database()
                .ref(`/Products/${id}`)
                //Opdaterer dataen i firebase endpoint
                .update({ brand, size, price, type });
            Alert.alert("Din information er nu opdateret");
            navigation.goBack();
        } catch (e) {
            Alert.alert(`Error: ${e.message}`);

        }
    };


    //Vi laver en renderfunktion der returenrer diverse textinputs og en knap
    render() {
        /*
        Vi opretter et edit view og opretter sidst en knap der kalder på ovenstående metode
        Med safeareaview sikre vi at viewet ikke står udenfor skærmen etc.
         */
        const { brand, size, price, type } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={styles.label}>Brand</Text>
                        <TextInput
                            value={brand}
                            onChangeText={this.handleBrandChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Størrelse</Text>
                        <TextInput
                            value={size}
                            onChangeText={this.handleSizeChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Pris</Text>
                        <TextInput
                            value={price}
                            onChangeText={this.handlePriceChange}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Type</Text>
                        <TextInput
                            value={type}
                            onChangeText={this.handleTypeChange}
                            style={styles.input}
                        />
                    </View>
                    <Button title="Edit product" onPress={this.updateData} />
                </ScrollView>
            </SafeAreaView>
        );
    }

}

