import React from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import Row, {Separator} from "../../Row";
import firebase from "firebase";

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

    render() {
        const {conversations} = this.state;

        if (!conversations) {
            return <Text> Ingen beskeder endnu </Text>;
        }
        //Opretter array til vores flatlist
        const conversationsArray = Object.values(conversations);

        //istantierer vores unikke nøgle som er id'erne i produkter
        const conversationKeys = Object.keys(conversations);

        const {chatRoom} = this.props;

        return (
            <FlatList
                data={conversationsArray}
                keyExtractor={(item, index) => conversationKeys[index]}
                renderItem={({item, index}) => {

                    return (
                        <Row
                            title={item.username}
                            price={item.lastMessage}
                            Photo={{uri: "https://www.studentproblems.com/wp-content/uploads/2020/04/Untitled-3-6.jpg"}}
                        />
                    );
                }}
                    ItemSeparatorComponent={Separator}
                    ListHeaderComponent={() => <Separator/>}
                    ListFooterComponent={() => <Separator/>}
                    contentContainerStyle={{paddingVertical: 20}}
                />
            /*
            <View styles={styles.container}>
                <View styles={styles.leftContainer}>
                    <Image source={{uri: "https://www.studentproblems.com/wp-content/uploads/2020/04/Untitled-3-6.jpg"}} styles={styles.image}/>
                    <View styles={styles.midContainer}>
                        <Text style={styles.username}>Simse</Text>
                        <Text style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
                    </View>
                </View>
                <Text style={styles.time}>Yesterday</Text>
            </View>

             */
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
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
});
