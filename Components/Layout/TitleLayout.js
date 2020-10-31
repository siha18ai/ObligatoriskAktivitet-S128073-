import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class TitleLayout extends React.Component{

    render() {
        const {title} = this.props;

        return(
            <View style={{paddingTop: 25}}>
                <Text style={styles.title}> {title} </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    title:{
        fontSize:25,
        paddingBottom:20,
        textAlign:'center',
        fontWeight:"bold"
    }
})