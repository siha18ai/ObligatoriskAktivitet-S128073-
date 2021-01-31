import * as React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput
} from 'react-native';

import firebase from "firebase";
import {Buttons} from "../../Buttons";
import Row, {Separator} from "../../Row";



//Denne komponent reuturnerer vores chat. Her kan man skrive beskeder til hinanden og man kan se ældre beskeder



//Vi eksporterer vores komponent
export default class Chatroom extends React.Component {

    //Vi laver nogle states som vi skal bruge i render
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


    //Vi laver en handler til at håndtere vores states i render
    handleBeskedChange = text => this.setState({besked: text});

    //Vi kalder på componentDidMount som executer diverse funktioner
    async componentDidMount() {

        //Vi får id
        const id = this.props.navigation.getParam('id');
        const currentId = this.state.id;
        this.setState({senderId: id});

        //Vi loader nuværende bruger
        await this.loadCurrentUser(currentId);

        await console.log("Current user navn: " + this.state.currentUserNavn);

        //Vi loader brugeren vi skal chatte med
        if (!this.state.user) {
            await this.loadUser(id);
        }

        //Vi loader chatten hvis vi har den
        await this.loadChat();

        //Hvis vi ikke har en chat endnu, laver vi en
        if (this.state.chatFundet === false) {
        } else {
            await this.getBeskeder()
        }
    }

    //Vi loader nuværende bruger
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


    //Vi loader brugeren vi skal chatte med
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

    //håndtere om vi har chatten
    handleChatFundet = async () => {
        this.setState({chatFundet: true})
    };

    //Vi loader chatten hvis vi har en
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

    //Denne funktion laver en chat
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

    //Denne funktion står for at sende en besked
    sendMessage = async () => {
        await this.createBeskeder();
        await this.getBeskeder();
    };

    //Denne funktion returnerer alle beskeder i cahtten
    getBeskeder = async () => {
        const {chatKey} = this.state;

        firebase
            .database()
            .ref('/Chat/' + chatKey + '/Messages')
            .on('value', snapshot => {
                this.setState({messages: snapshot.val()})
            });
    };

    //Denne funktion laver beskeder
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


    //Vi laver en render som returnerer beskederne og et textinput så brgueren kan skrive en besked
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

//Styles
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