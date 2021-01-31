import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";




//Denne komponent står for alle knapper i programmet. Det er bare knap-komponent vi selv har lavet

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#00f",
        paddingVertical: 10,
        paddingHorizontal: 45,
        alignItems: "center",
        marginHorizontal: 20
    },
    buttonLoading: {
        backgroundColor: "#00f"
    },
    text: {
        fontWeight: "500",
        fontSize: 18,
        color: "#fff"
    }
});


//Vi eksporterer vores knap
export const Buttons = ({ text, onPress, disabled = false, style = {} }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.button, disabled && styles.buttonLoading, style]}
        disabled={disabled}
    >
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
);