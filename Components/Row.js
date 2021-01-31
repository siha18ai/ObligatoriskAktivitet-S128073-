import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

//Denne komponent returnerer en TouchableOpacity. Det er en komponent vi selv har lavet som vi kalder på flere gange

export default class Row extends React.Component{
    handlePress = () => {
        const {id, onSelect, name} = this.props;
        if(!name){
            onSelect(id);
        }
        else{
            onSelect(id, name);
        }
    };
    render() {
        const {title, price, Photo } = this.props
        return(
            <TouchableOpacity onPress={this.handlePress} style={styles.container}>
                <View>
                    <Image
                        style={styles.image}
                        source={Photo}/>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>Mærke: {title}</Text>
                    <Text style={styles.subtitle}>Pris: {price}</Text>
                </View>
                <View style={styles.right}>
                    <Ionicons name="ios-arrow-forward" color="#666" size={20} />
                </View>
            </TouchableOpacity>
        )
    }
}

export const Separator = () => <View style={styles.separator} />;


//Styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    content: {
        alignItems: "flex-start",
        justifyContent: "center"
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#3a3a3a"
    },
    subtitle: {
        color: "#666",
        fontSize: 16,
        marginTop: 2
    },
    separator: {
        backgroundColor: "#ececec",
        height: 1
    },
    right: {
        alignItems: "flex-end",
        flex: 1
    }
});