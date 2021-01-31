import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

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

export const Buttons = ({ text, onPress, disabled = false, style = {} }) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.button, disabled && styles.buttonLoading, style]}
        disabled={disabled}
    >
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
);