import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {createBottomTabNavigator} from "react-navigation-tabs";
import ProductList from './Components/ProductList';
import { createStackNavigator } from 'react-navigation-stack';
import {AntDesign, MaterialIcons, FontAwesome5, MaterialCommunityIcons, Octicons} from '@expo/vector-icons';
import {createAppContainer, getActiveChildNavigationOptions} from "react-navigation";
import firebase from 'firebase';
import ProductDetails from "./Components/SubComponents/ProductDetails";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/SubComponents/EditProduct";
import LoginView from "./Components/Login/LoginView";
import SignUpView from "./Components/Login/SignUpView";
import GLOBALUser from "./Components/GlobalUser";
import { Alert,Platform,LogBox, Text, View} from 'react-native';
import SettingView from './Components/SubComponents/SettingView';
import Inbox from './Components/SubComponents/Inbox/Inbox';
import MyTrades from './Components/SubComponents/Trades/MyTrades';
import NewMessage from "./Components/SubComponents/Inbox/NewMessage";
import InboxContent from './Components/SubComponents/Inbox/InboxContent';
import MessageDetails from './Components/SubComponents/Inbox/MessageDetails';
import BrandScreen from './Components/Login/BrandScreen';
import ScreenNavigator from './Components/Login/ScreenNavigator';
import ProfileScreen from "./Components/Settings/ProfileScreen";
import SettingsList from "./Components/Settings/SettingsList";
import ChatScreen from "./Components/SubComponents/Beskeder/ChatScreen";
import FindPersoner from "./Components/SubComponents/Beskeder/FindPersoner";
import ChatListItem from "./Components/SubComponents/Beskeder/Index";
import Chatroom from "./Components/SubComponents/Beskeder/Chatroom";
import {Appbar} from "react-native-paper";


/*
Hvis platformen ikke er web, så fjerner vi logbox
 */
if(Platform.OS !== "web"){
    LogBox.ignoreAllLogs(true)
}

/*
Vores product listView hvor vi samler de forskellige screens der skal indgå
 */
const StackNavigator = createStackNavigator(
    {
      ProductList: { screen: ProductList },
      ProductDetails: { screen: ProductDetails },
      EditProduct: { screen: EditProduct }
    },
    //Vi siger hvilken klasse der først skal tilgåes af de 3 ovenstående
    {initialRouteKey: 'ProductList'}
);
const headerRight = () =>{
    return(
        <View>
            <MaterialCommunityIcons name={"axis-z-arrow-lock"}/>
        </View>
    )
}


const StackNavigatorMessage = createStackNavigator(
    {
        ChatListItem: {screen: ChatListItem},
        FindPersoner: {screen: FindPersoner},
        Chatroom: {
            screen: Chatroom,
            navigationOptions: ({navigation}) => ({
                headerTitle: navigation.getParam('name'),
                headerRight: () => (
                    <View Style={{
                        flexDirection: 'row',
                        width: 100,
                        justifyContent: 'space-between',
                        marginRight: 10,
                    }}>

                        <MaterialCommunityIcons name="dots-vertical" size={22} color={'black'}/>

                    </View>
                )
            })
        },
    },
    //Vi siger hvilken klasse der først skal tilgåes af de 3 ovenstående
    {initialRouteKey: 'ChatListItem'}
);
const StackNavigatorSetting = createStackNavigator(
    {
        SettingsList: {screen: SettingsList},
        ProfileScreen: { screen: ProfileScreen }
    },
    {initialRouteKey: 'SettingsList'}
);
const StackNavigatorTrades = createStackNavigator(
    {
        MyTradesScreen: {screen: MyTrades},
        ProductDetails: {screen: ProductDetails}
    }
)


//Vi opretter vores tab i bunden
const TabNavigator = createBottomTabNavigator({

    Main: {
        screen: StackNavigator,
        navigationOptions: {
          tabBarLabel: "Produkter",
          tabBarIcon: ({tintColor}) => (
              <AntDesign name={'home'} size={20} color={tintColor}/>
          )
        },
      },


    Inbox: {
          screen: StackNavigatorMessage,
            navigationOptions: {
              tabBarLabel: "Indbakke",
                tabBarIcon: ({tintColor}) => (
                  <AntDesign name={'inbox'} size={20} color={tintColor}/>
                )
            },
        },
    Add: {
        screen: AddProduct,
        navigationOptions: {
          tabBarLabel: "Tilføj",
          tabBarIcon: ({tintColor}) => (
              <AntDesign name={'pluscircleo'} size={20} color={tintColor}/>
          )
        },
      },
    Trades: {
        screen: StackNavigatorTrades,
        navigationOptions: {
            tabBarLabel: "Handler",
            tabBarIcon: ({tintColor}) => (
                <AntDesign name={'shoppingcart'} size={20} color={tintColor}/>
            )
        },
    },

    Settings: {
          screen: StackNavigatorSetting,
        navigationOptions: {
              tabBarLabel: "Indstillinger",
            tabBarIcon: ({tintColor}) => (
                  <MaterialCommunityIcons name={'account'} size={20} color={tintColor} />
            )
        },
    },


    },

    {
      tabBarOptions: {
        showIcon:true,
        labelStyle: {
          fontSize: 12,
        },
        activeTintColor: 'darkblue',
        inactiveTintColor: 'gray',
        size:40
      }
    });
const LoginBrandNavigator = createStackNavigator({

    BrandScreen:{screen:BrandScreen, navigationOptions:{headerShown:false}},
    ScreenNavigator:{screen:ScreenNavigator, navigationOptions:{headerShown:false}}
},
    {initialRouteKey: 'BrandScreen'}

);


const LoginContainer = createAppContainer(LoginBrandNavigator);
const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {

    constructor() {
        super();
        GLOBALUser.user = this;
        this.init();
        this.observeAuth();
    }
    state= {
        user:null
    };

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
    }

    //Opretter forbindelse til vores firebase
    init = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyBzhmQLVF2SX-JOCj5ByGEeYX6SPXiD608",
            authDomain: "obaktivitet1.firebaseapp.com",
            databaseURL: "https://obaktivitet1.firebaseio.com",
            projectId: "obaktivitet1",
            storageBucket: "obaktivitet1.appspot.com",
            messagingSenderId: "1094098734207",
            appId: "1:1094098734207:web:cc153710b383277492c34a",
            measurementId: "G-6YGGC5MT4X"
        }
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }
    observeAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user});

            GLOBALUser.user.setState({
                user:user
            })
        });
    }
  render() {
        if (!this.state.user) {
            return <LoginContainer/>
        } else {
            //Returnere vores tab navigator
            return <AppContainer/>;
        }
  }
}


