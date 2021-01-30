import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    ActivityIndicator
} from 'react-native';

import firebase from "firebase";
import {Buttons} from "../../Buttons";
import Row, {Separator} from "../../Row";
import {AntDesign, MaterialIcons, FontAwesome5, MaterialCommunityIcons, Octicons} from '@expo/vector-icons';
import Carousel from "react-native-snap-carousel";
import ChatMessage from "./ChatMessage";
import {lessThan} from "react-native-reanimated";

export default class Chatroom extends React.Component {
    state = {
        user: null,
        messages: {},
        chat: null,
        besked: '',
        id: firebase.auth().currentUser.uid,
        senderId: '',
        chatKey: '',
        isLoading: true,
        chatFundet: false,
        currentUserNavn: ''
    };

    handleBeskedChange = text => this.setState({besked: text});

    async componentDidMount() {
        const id = this.props.navigation.getParam('id');
        const currentId = this.state.id;
        this.setState({senderId: id});

        await this.loadCurrentUser(currentId);

        await console.log("Current user navn: " + this.state.currentUserNavn);


        if (!this.state.user) {
            await this.loadUser(id);
        }

        await this.loadChat();

        if (this.state.chatFundet === false) {
        } else {
            await this.getBeskeder()
        }
    }

    loadCurrentUser = async id => {
        try {
            firebase
                .database()
                .ref('/UserAttributes')
                .orderByChild('/id')
                .equalTo(id)
                .on('value', snapShot => {
                    if (snapShot) {
                        const users = snapShot.val();
                        const userArray = Object.values(users);
                        this.setState({currentUserNavn: userArray[0].name})
                    }
                });
        } catch (e) {
            console.log("Der sker en fejl med brugeren her: " + e)
        }
    };

    loadUser = async id => {
        try {
            firebase
                .database()
                .ref('/UserAttributes')
                .orderByChild('/id')
                .equalTo(id)
                .on('value', snapShot => {
                    if (snapShot) {
                        const users = snapShot.val();
                        const userArray = Object.values(users);
                        this.setState({user: userArray[0]})
                    }
                });
        } catch (e) {
            console.log("Der sker en fejl med brugeren her: " + e)
        }
    };
    handleChatFundet = async () => {
        this.setState({chatFundet: true})
    };

    loadChat = async () => {
        const {user, id} = this.state;
        let boolean = 0;
        console.log("User id: " + user.id);
        console.log("id: " + id);
        try {
            firebase
                .database()
                .ref('/Chat')
                .on('value', snapshot => {
                    if (snapshot) {
                        let chats = snapshot.val();
                        const chatArray = Object.values(chats);
                        const chatKeys = Object.keys(chats);
                        for (let i = 0; i < chatArray.length; i++) {
                            if (chatArray[i].id === id && chatArray[i].senderId === user.id || chatArray[i].senderId === id && chatArray[i].id === user.id) {
                                this.handleChatFundet();
                                this.setState({chat: chatArray[i]});
                                this.setState({chatKey: chatKeys[i]});
                                console.log("Kan vi finde chatten? Chat: " + chatArray[i] + " og chatKey: " + chatKeys[i]);
                                console.log("Chatkey  lavet nu? " + this.state.chatKey);
                                boolean = 1;
                                console.log("Boolean nu: " + boolean);
                            }
                        }
                        if (boolean === 0) {
                            console.log("Er boolean virkelig false? " + boolean);
                            this.createChat();
                        } else {
                            this.getBeskeder()
                        }
                    }
                });
        } catch (e) {
            console.log("Det er her det sker, chatroom" + e)
        }
    };
    createChat = () => {
        const {
            senderId,
            id
        } = this.state;
        try {
            firebase
                .database()
                .ref('/Chat/')
                .push({
                    id,
                    senderId
                });
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    };

    sendMessage = async () => {
        await this.createBeskeder();
        await this.getBeskeder();
    };

    getBeskeder = async () => {
        const {chatKey} = this.state;

        firebase
            .database()
            .ref('/Chat/' + chatKey + '/Messages')
            .on('value', snapshot => {
                this.setState({messages: snapshot.val()})
            });
    };

    createBeskeder = async () => {
        const {besked, user, chatKey} = this.state;
        const afsender = user.id;
        const navn = this.state.currentUserNavn;
        try {
            const reference = firebase
                .database()
                .ref('/Chat/' + chatKey + '/Messages')
                .push({
                    besked,
                    afsender,
                    navn
                })
            this.setState({besked: ''})
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }

    };

    render() {
        const {besked, user, chat, senderId, messages} = this.state;

        if (!user) {
            return (
                <View>
                    <Text>Sender id: {this.state.senderId}</Text>
                </View>
            );
        } else if (!chat) {
            return (
                <View style={styles.container2}>
                    <View style={styles.view1}>
                        <Text>Dette er når chat er falsk</Text>
                        <Text>Sender id: {senderId}</Text>
                        <Text>Brugeren navn: {user.name}</Text>
                    </View>
                    <View style={styles.view2}>
                        <TextInput
                            value={besked}
                            onChangeText={this.handleBeskedChange}
                            placeholder="Skriv en besked"
                        />
                        <Buttons text="Send"/>
                    </View>
                </View>
            );
        } else if (!messages){
            return (
                <View style={styles.container2}>
                    <View style={styles.view1}>
                        <Text> Start en samtale med {user.name} </Text>
                    </View>
                    <View style={styles.view2}>
                        <TextInput
                            value={besked}
                            onChangeText={this.handleBeskedChange}
                            placeholder="Skriv en besked"
                        />
                        <Buttons text="Send" onPress={this.sendMessage}/>
                    </View>
                </View>
            );
        }
        const messageArray = Object.values(messages);
        const messageKeys = Object.keys(messages);
        return (
            <View style={styles.container2}>
                <View style={styles.view1}>
                    <FlatList
                        data={messageArray}
                        keyExtractor={(item, index) => messageKeys[index]}
                        renderItem={({item, index}) => {
                            return (
                                <View>
                                    <Text>Afsender: {item.navn}</Text>
                                    <Text>{item.besked}</Text>
                                    <Text></Text>
                                </View>
                            );
                        }}
                        ItemSeparatorComponent={Separator}
                        ListHeaderComponent={() => <Separator/>}
                        ListFooterComponent={() => <Separator/>}
                        contentContainerStyle={{paddingVertical: 20}
                        }
                    />
                </View>
                <View style={styles.view2}>
                    <TextInput
                        value={besked}
                        onChangeText={this.handleBeskedChange}
                        placeholder="Skriv en besked"
                    />
                    <Buttons text="Send" onPress={this.sendMessage}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container2: {
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