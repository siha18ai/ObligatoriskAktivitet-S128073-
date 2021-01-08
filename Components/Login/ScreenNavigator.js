import {createBottomTabNavigator} from "react-navigation-tabs";
import LoginView from "./LoginView";
import SignUpView from "./SignUpView";
import {createAppContainer} from "react-navigation";
import {AntDesign} from '@expo/vector-icons';
import React from "react";

const LoginNavigator = createBottomTabNavigator({

        Login: {
            screen: LoginView,
            navigationOptions: {
                tabBarIcon:({tintColor}) => (
                    <AntDesign name={"login"} size={24} color={tintColor}/>
                )
            }
        },
        SignUp: {
            screen: SignUpView,
            navigationOptions: {
                tabBarIcon:({tintColor}) => (
                    <AntDesign name={"plus"} size={24} color={tintColor}/>
                )
            }
        },
    }
);
const LoginContainer = createAppContainer(LoginNavigator);


export default class ScreenNavigator extends React.Component {
render() {
    return <LoginContainer/>
}

}

