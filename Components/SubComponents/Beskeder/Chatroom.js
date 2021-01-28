import * as React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';

import Row, {Separator} from "../../Row";
import firebase from "firebase";
import {Buttons} from "../../Buttons";

export default class ChatRoom extends React.Component{
    state={
        søgeord:'',
        users: {}
    };

    componentDidMount() {
        firebase
            .database()
            .ref('/UserAttributes')
            .on('value', snapshot => {
                this.setState({users: snapshot.val()});
            });
    }

    handlesøgeordChange = text => this.setState({søgeord: text});

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
                            return (
                                <Row
                                    title={name}
                                    price={email}
                                    Photo={{uri: "https://www.studentproblems.com/wp-content/uploads/2020/04/Untitled-3-6.jpg"}}
                                    id={usersArray[index]}
                                    onSelect={() => console.log(item)}
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