import * as React from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, KeyboardAvoidingView} from 'react-native';

import firebase from "firebase";
import {Buttons} from "../../Buttons";
import Row, {Separator} from "../../Row";

export default class Chatroom extends React.Component {
    _isMounted = false;

    state={
        user: null,
        messages: {}
    };


    componentDidMount() {
        this._isMounted = true;
        const id = this.props.navigation.getParam('id');
        const name = this.props.navigation.getParam('name');
        console.log("Vi kommer her til: " + id)
        console.log("Vi kommer også her til: " + name)

        if (this._isMounted) {
            this.loadUser(id)
        }
    }

    loadUser = id =>{
        firebase
            .database()
            .ref('/UserAttributes/' + id)
            .on('value', dataObject => {
                console.log("User: " + dataObject.val())
                this.setState({user: dataObject.val()});
            });
    }
    render() {
        const {user, messages} = this.state;

        //Opretter array til vores flatlist
        const messageArray = Object.values(messages);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const messageKeys = Object.keys(messages);

        if(!user && !messages){
            return <Text>Ingen bruger uploaded</Text>
        }
        else if(!messages){
            return <Text>Ingen beskeder endnu fra {user.name}</Text>
        }
        else{
            return (
                <View>
                    <FlatList
                    data={messages}
                    keyExtractor={(item, index) => messageKeys[index]}
                    renderItem={({item, index}) => {
                        return (
                            <Row
                                title={'name'}
                                price={'email'}
                                id={'id'}
                                name={'name'}
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
            )
        }
    }
}