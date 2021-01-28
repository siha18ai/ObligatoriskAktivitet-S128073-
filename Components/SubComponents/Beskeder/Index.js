import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, Button, Alert} from 'react-native';
import Row, {Separator} from "../../Row";
import firebase from "firebase";
import {Buttons} from "../../Buttons";

export default class ChatListItem extends React.Component{
    state = {
        conversations: {},
    };

    componentDidMount() {
        firebase
            .database()
            .ref('/Conversations')
            .on('value', snapshot => {
                this.setState({conversations: snapshot.val()});
            });
    }

    handleSelectConversation = () => {
        this.props.navigation.navigate('FindPersoner');
    };

    render() {
        const {conversations} = this.state;

        if (!conversations) {
            return (
                <View style={styles.container}>
                    <View style={styles.view1}>
                        <Text> Ingen beskeder endnu </Text>
                    </View>
                    <View style={styles.view2}>
                        <Buttons onPress={this.handleSelectConversation} text="Ny samtale"/>
                    </View>
                </View>
            )
        }

        //Opretter array til vores flatlist
        const conversationsArray = Object.values(conversations);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const conversationKeys = Object.keys(conversations);

        //const {chatRoom} = this.props;

        return (
            <View style={styles.view1}>
                <View style={styles.view1}>
                <FlatList
                    data={conversationsArray}
                    keyExtractor={(item, index) => conversationKeys[index]}
                    renderItem={({item, index}) => {

                        return (
                            <Row
                                title={item.username}
                                price={item.lastMessage}
                                onSelect={this.handleSelectConversation}
                                Photo={{uri: "https://www.studentproblems.com/wp-content/uploads/2020/04/Untitled-3-6.jpg"}}
                            />
                        );
                    }}
                    ItemSeparatorComponent={Separator}
                    ListHeaderComponent={() => <Separator/>}
                    ListFooterComponent={() => <Separator/>}
                    contentContainerStyle={{paddingVertical: 20}}
                />
                </View>
                <View style={styles.view2}>
                    <Button onPress={() => Alert.alert('Todo')}
                    title = "hey"/>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftContainer: {
        flexDirection: 'row'
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
    },
    username: {
        //fontweight: 'bold',
        //fontsize: 16,
    },
    lastMessage: {
        //fontsize: 16,
        color:'grey'
    },
    time: {
        fontSize: 14,
        color: 'grey'
    },
    midContainer: {
        justifyContent: 'space-around'
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
