import * as React from 'react';
import firebase from 'firebase';
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    Alert,
    Image,
    PixelRatio
} from 'react-native';
import logo1 from '../../../assets/Image1.png';


export default class InboxContent extends React.Component{

    render() {
        return(
            <View>
            <View style={styles.row}>
                <Image source={logo1} style={styles.cellImage}/>
                <View style={styles.container}>
                    <Text style={styles.name} numberOfLines={1}>
                        Simon Oliver
                    </Text>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        Jeg vil gerne købe dine brugte støvler
                    </Text>
                    <Text style={styles.lastMessage} numberOfLines={1}>
                        5 days ago
                    </Text>
                </View>
            </View>
                <View style={styles.cellBorder}/>
            </View>


        )
    }

}
/*Styles*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10
    },
    textContainer: {
        flex: 1
    },
    cellImage: {
        height: 60,
        borderRadius: 30,
        marginRight: 5,
        width: 60
    },
    time: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: 12,
        color: '#cccccc'
    },
    name: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 1
    },
    lastMessage: {
        color: '#999999',
        fontSize: 12
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        height: 1 / PixelRatio.get(),
        marginLeft: 4
    }
});
