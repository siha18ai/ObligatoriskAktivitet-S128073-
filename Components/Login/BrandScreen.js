import * as React from 'react';
import {View, ImageBackground} from 'react-native';

const bg=require('../../assets/SportsbørsenBrand.png');
const logo=require('../../assets/Sportsbørsen.png');




//Denne komponent viser vores logo når appen startes op





//Vi laver en export default af vores komponent
export default class BrandScreen extends React.Component {

    //Vi opretter en constructor
    constructor(props) {
        super(props);
        setTimeout(()=>{
            this.props.navigation.navigate("ScreenNavigator");
        }, 7000);
    }

    //Vi laver en render funktion og returnerer vores logo
    render() {
        return(
            <ImageBackground
                source={bg}
                style={{height:'100%', width:'100%'}}>
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>

                </View>

            </ImageBackground>
        );
    }
}