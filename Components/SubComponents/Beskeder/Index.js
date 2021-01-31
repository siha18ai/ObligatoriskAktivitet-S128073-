import React from 'react';
import {View, Text, Image, StyleSheet, FlatList, Button, Alert} from 'react-native';
import Row, {Separator} from "../../Row";
import firebase from "firebase";
import {Buttons} from "../../Buttons";



//Denne funktion returnerer voes chatliste. Den returnerer alle chats som brugeren har




//Vi exporterer vores komponent
export default class ChatListItem extends React.Component{


    //Vi laver nogle states som vi skal bruge i render
    state = {
        chatsId: {},
        chatsSenderId: {},
        brugere: {},
        id: firebase.auth().currentUser.uid
    };

    //Vi kalder på componentDidMount som excecuter diverse funktioner
    async componentDidMount() {
        const {id} = this.state;
        await this.getUserById(id);
        await this.getUserBySenderId(id);
        if(this.state.chatsId.length === 0){}
        else {
            await this.getUsers();
        }
        if(this.state.chatsSenderId.length === 0){}
        else {
            await this.getUsers();
        }
    }

    //Vi finder alle chats som current user er involveret i
    getUserById = async (id) =>{
        firebase
            .database()
            .ref('/Chat')
            .orderByChild('/id')
            .equalTo(id)
            .on('value', snapshot => {
                this.setState({chats: snapshot.val()})
            })
    }

    //Vi finder alle chats som current user er involveret i
    getUserBySenderId = async (id) => {
        firebase
            .database()
            .ref('/Chat')
            .orderByChild('/senderId')
            .equalTo(id)
            .on('value', snapshot => {
                this.setState({chatsSenderId: snapshot.val()})
            });
    }

    //Vi finder brugeren der er chattet med
    getUsers = async () => {
        const chats1 = Object.values(this.state.chatsId);
        const chats2 = Object.values(this.state.chatsSenderId);

        for(let i = 0; i < chats1.length; i++){
            await this.loadUser(chats1.senderId)
        }
        for(let i = 0; i < chats2.length; i++){
            await this.loadUser(chats2.id)
        }
    };

    //Vi loader brugeren som vi har chattet med
    loadUser = async (id) => {
        let brugere = this.state.brugere;
        firebase
            .database()
            .ref('/UserAttributes')
            .orderByChild('/id')
            .equalTo(id)
            .on('value', snapshot =>{
                let result = snapshot.val();
                let array = Object.values(result);
                brugere.add(array[0]);
                this.setState({brugere: brugere})
            });
    }

    //Vi opretter en handler af states som vi bruger i render
    handleSelectConversation = () => {
        this.props.navigation.navigate('FindPersoner');
    };


    //Vi laver en render funktion som returner en flatlist med samtaler og en knap for en ny besked
    render() {
        const {brugere} = this.state;

        //Opretter array til vores flatlist
        const brugereArray = Object.values(brugere);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const brugereKeys = Object.keys(brugere);

        if (brugereArray.length === 0) {
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

        return (
            <View style={styles.view1}>
                <View style={styles.view1}>
                <FlatList
                    data={brugereArray}
                    keyExtractor={(item, index) => brugereKeys[index]}
                    renderItem={({item, index}) => {

                        return (
                            <Row
                                title={item.name}
                                price={item.email}
                                onSelect={this.handleSelectConversation}
                                Photo={{uri: item.billede}}
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

//Styles
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
