import * as React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';

import Row, {Separator} from "../../Row";
import firebase from "firebase";
import {Buttons} from "../../Buttons";



//Denne funktion returnerer viewet hvor man skal kunne finde personer og chatte med.



//Vi eksporterer vores komponent
export default class FindPersoner extends React.Component{


    //Vi laver nogle states som vi skal bruge i render funktionen
    state={
        søgeord:'',
        users: {},
        id: firebase.auth().currentUser.uid,
        senderId: firebase.auth().currentUser.uid
    };


    //Vi kalder på en componentDidMount som excecuter et firebase-kald der giver os brugere
    componentDidMount() {
        firebase
            .database()
            .ref('/UserAttributes')
            .on('value', snapshot => {
                let brugere = Object.values(snapshot.val());
                for(let i = 0; i < brugere.length; i++){
                    if(brugere[i].id == this.state.id){
                        brugere.splice(i, 1)
                    }
                }
                this.setState({users: brugere});
            });
    }

    //Vi laver en handler til at ændre på states i render
    handlesøgeordChange = text => this.setState({søgeord: text});


    //Vi håndterer et tryk på knappen
    handleOnPress = () => {
        firebase
            .database()
            .ref('/UserAttributes')
            .orderByChild("/name")
            .startAt(this.state.søgeord)
            .on('value', snapshot => {
                this.setState({users: snapshot.val()});
            });
    };

    //Vi håndterer at der blvier trykket på en person man gerne vil chatte med
    handleSelectUser = (id, name) => {
        console.log("Id: " + id);
        console.log("Name: " + name);
        this.props.navigation.navigate('Chatroom', {id, name});
    };


    //Vi laver en render funktion der returnerer et textinput for at søge, en knap og en flatlist med brugere
    render() {
        const {
            søgeord,
            users
        } = this.state;

        if (!users) {
            return(
                <View Style={styles.container}>
                    <View Style={styles.view2}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder={"Søg på et navn"}
                            value={søgeord}
                            onChangeText={this.handlesøgeordChange}
                        />
                        <Buttons text="Søg" onPress={() => console.log("Todo")}/>
                    </View>
                    <View Style={styles.view1}>
                        <Text> Der er ingen personer som har oprettet sig endnu </Text>
                    </View>
                </View>
            )
        }
        //Opretter array til vores flatlist
        const usersArray = Object.values(users);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const usersKeys = Object.keys(users);
        return(
            <View Style={styles.container}>
                <View Style={styles.view2}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"Søg på et navn"}
                        value={søgeord}
                        onChangeText={this.handlesøgeordChange}
                    />
                    <Buttons onPress={this.handleOnPress} text="Søg"/>
                </View>
                <View Style={styles.view1}>
                    <FlatList
                        data={usersArray}
                        keyExtractor={(item, index) => usersKeys[index]}
                        renderItem={({item, index}) => {
                            const name = `${item.name}`;
                            const email = `${item.email}`;
                            const id = `${item.id}`;
                            return (
                                <Row
                                    title={name}
                                    price={email}
                                    id={id}
                                    name={name}
                                    Photo={{uri: item.billede.uploadedImageUrl}}
                                    onSelect={this.handleSelectUser}
                                />
                            );
                        }}
                        ItemSeparatorComponent={Separator}
                        ListHeaderComponent={() => <Separator/>}
                        ListFooterComponent={() => <Separator/>}
                        contentContainerStyle={{paddingVertical: 20}}
                    />
                </View>
            </View>
        )
    }
}

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view1: {
        flex: 3,
        justifyContent: 'space-around'
    },
    view2: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    searchInput: {
        margin: 8,
        paddingHorizontal: 100,
        backgroundColor: '#ccffff',
        borderRadius: 10,
        padding: 12,
        justifyContent: 'center',
        textAlign: 'center',
    }
});