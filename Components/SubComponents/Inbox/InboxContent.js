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
    PixelRatio,
    FlatList
} from 'react-native';
import logo1 from '../../../assets/Image1.png';
import MessageListItem from "../MessageListItem";


export default class InboxContent extends React.Component{
state = {
    message: {}
};

componentDidMount() {
    firebase
        .database()
        .ref('/Message')
        .on('value', snapshot => {
            this.setState({message: snapshot.val()})
        });
}

handleSelectMessage = id => {
    this.props.navigation.navigate('MessageListItem', {id})
}

    render() {
    const { message } = this.state;

    if (!message) {
        return <Text> Du skal være logget ind for at se beskeder </Text>
    }

    const messageArray = Object.values(message);

    const messageKeys = Object.values(message);

        return(
            <View>

                <FlatList
                    data={messageArray}
                    keyExtractor={(item, index) => messageKeys[index]}
                    renderItem={({item, index}) => (
                        <MessageListItem
                        message={item}
                        id={messageKeys[index]}
                        onSelect={this.handleSelectMessage}/>
                    )}
                />
                <View style={styles.cellBorder}/>

                <Button
                    title={"Ny Besked"}
                    onPress={() => this.props.navigation.navigate('NewMessage')}/>
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
    },
    cellHeight: {
        marginTop: 50
    }
});
