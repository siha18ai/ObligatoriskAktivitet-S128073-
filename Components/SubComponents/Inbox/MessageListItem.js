import * as React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        flex: 1,
        borderWidth: 1,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});

export default class MessageDetails extends React.Component{
    //Håndterer brugerens tryk på produkterne i product list
    handlePress = () => {
        const {id, onSelect} = this.props
        onSelect(id);
    };

    render() {
        //Returnerer producter i list view og sørger for at de er touchable
        //Returner også de attributter der skal ses i listen
        const { message } = this.props;
        return(
            <TouchableOpacity style={styles.container} onPress={this.handlePress}>
                <Text style={styles.label}>
                    {message.message}
                </Text>
            </TouchableOpacity>
        )
    }

}