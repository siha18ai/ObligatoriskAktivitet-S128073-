import * as React from 'react';
import {View, ImageBackground, Image} from 'react-native';

const bg=require('../../assets/FodboldBørsen_Background.png');
const logo=require('../../assets/PORNHUBPNG.png');
const SportsBørsen=require('../../assets/Sportsbørsen.png');
export default class BrandScreen extends React.Component {

    constructor(props) {
        super(props);
        setTimeout(()=>{
            this.props.navigation.navigate("ScreenNavigator");
        }, 5000);
    }

    render() {
        return(
            <ImageBackground
                source={bg}
                style={{height:'100%', width:'100%'}}>
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <Image source={SportsBørsen} style={{height: 100, alignContent:'center'}}>

                    </Image>

                </View>

            </ImageBackground>
        );
    }
}