import * as React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView, Alert} from 'react-native';

import firebase from "firebase";
import {Buttons} from "../../Buttons";
import Row, {Separator} from "../../Row";
import {AntDesign, MaterialIcons, FontAwesome5, MaterialCommunityIcons, Octicons} from '@expo/vector-icons';
import Carousel from "react-native-snap-carousel";
import ChatMessage from "./ChatMessage";

export default class Chatroom extends React.Component {
    _isMounted = false;

    state={
        user: null,
        messages: {},
        chat: null,
        besked: '',
        id: firebase.auth().currentUser.uid,
        senderId: '',
        chatKey: ''
    };

    handleBeskedChange = text => this.setState({besked: text});

    componentDidMount() {
        this._isMounted = true;
        const id = this.props.navigation.getParam('id');
        console.log("Param id: " + id);
        if (this._isMounted) {
            this.loadUser(id);
            if(!this.state.user){
            }
            else {
                this.loadChat();
                //this.loadMessages();
            }
        }
    }

    //Vi finder brugeren som er trykket på
    loadUser = id =>{
        firebase
            .database()
            .ref('/UserAttributes')
            .on('value', snapShot => {
                let bruger = Object.values(snapShot.val());
                for(let i = 0; i < bruger.length; i++){
                    if(bruger[i].id == id){
                        this.setState({senderId: bruger[i].id});
                        this.setState({user: bruger[i]})
                    }
                }
            });
    };



    handlePressSendNewMessage = () =>{
        const {
            besked,
            user,
            id,
            senderId
        } = this.state;
        console.log("id: " + id)
        console.log("senderid: " + senderId)
        try {
            const reference = firebase
                .database()
                .ref('/Chat/')
                .push({
                    id,
                    senderId
                })
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }

       this.loadChat(besked)
    };

    //Finder chatten mellem de 2 personer
    loadChat = besked =>{
        firebase
            .database()
            .ref('/Chat')
            .on('value', snapshot => {
                let chats = Object.values(snapshot.val());
                const chatKeys = Object.keys(snapshot.val());
                for(let i = 0; i < chats.length; i++){
                    if(chats[i].id == this.state.id && chats[i].senderid == this.state.senderid || chats[i].id == this.state.senderid && chats[i].senderid == this.state.id){
                        console.log("ChatKey: " + chatKeys[i])
                        this.setState({chatKey: chatKeys[i]});
                        this.setState({chat: chats[i]})
                    }
                }
            })
        console.log("Chatten: " + this.state.chat)
       this.createBeskeder(besked)
    };


    //Vi laver beskeder i chatten
    createBeskeder = besked => {
        console.log("Chat key igen: " + this.state.chatKey)
        try {
            const reference = firebase
                .database()
                .ref('/Chat/'+this.state.chatKey +'/Messages')
                .push({
                    besked
                })
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
        this.loadBeskeder();
    };


    //Vi oploader alle beskeder mellem de 2 brugere
    loadBeskeder = () =>{
        firebase
            .database()
            .ref('/Chat/'+this.state.chatKey+"/Messages")
            .on('value', snapshot => {
                this.setState({messages: snapshot.val()})
            })
    };

    render() {
        const {user, messages, chat, besked} = this.state;

        //Opretter array til vores flatlist
        const messageArray = Object.values(messages);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const messageKeys = Object.keys(messages);

        if(!user && !chat){
            return <Text>Ingen bruger uploaded</Text>
        }
        else if(!chat) {
            return (
                <View>
                    <Text>Ingen beskeder endnu fra {user.name}</Text>
                    <TextInput
                        placeholder={"Skriv en besked!"}
                        value={besked}
                        onChangeText={this.handleBeskedChange}
                        returnKeyType="go"
                        autoCapitalize="false"
                        autoCorrect={false}
                    />
                    <Buttons text="Send" onPress={this.handlePressSendNewMessage}/>
                </View>
            )
        }
        return (
            <FlatList
                data={messageArray}
                keyExtractor={(item, index) => messageKeys[index]}
                renderItem={({item}) => <ChatMessage message={item}/>}
            />
        )
    }
}