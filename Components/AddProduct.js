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

export default class AddProduct extends React.Component{

    state = {
        brand: '',
        size: '',
        price: '',
        type: '',

    };

    handleBrandChange = text => this.setState({ brand: text });

    handleSizeChange = text => this.setState({size: text});

    handlePriceChange = text => this.setState({price: text});

    handleTypeChange = text => this.setState({type: text});

    handleSave = () => {
        const {brand, size, price, type} = this.state;
        try {
            const reference = firebase
                .database()
                .ref('/Products/')
                .push({brand, size, price, type});
            Alert.alert('Saved');
            this.setState({
                brand: '',
                size: '',
                price: '',
                type: '',
                });


        } catch (error) {
            Alert.alert(`Error: ${error.message}`);
        }
    };
    render() {
        const {brand, size, price, type} = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={styles.label}> Brand </Text>
                        <TextInput
                        value={brand}
                        onChangeText={this.handleBrandChange}
                        style={styles.input}
                        />
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}> Size </Text>
                        <TextInput
                        value={size}
                        onChangeText={this.handleSizeChange}
                        style={styles.input}/>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}> Price </Text>
                        <TextInput
                        value={price}
                        onChangeText={this.handlePriceChange}
                        style={styles.input}/>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}> Type </Text>
                        <TextInput
                        value={type}
                        onChangeText={this.handleTypeChange}
                        style={styles.input}/>
                    </View>

                    <Button title={"Add product"} onPress={this.handleSave}/>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

