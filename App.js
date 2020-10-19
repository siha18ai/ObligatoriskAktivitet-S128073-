import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from "react-navigation-tabs";
import ProductList from './Components/ProductList';
import { createStackNavigator } from 'react-navigation-stack';
import Camera from './Components/CameraScreen';
import {MaterialIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import {createAppContainer} from "react-navigation";
import firebase from 'firebase';
import ProductDetails from "./Components/SubComponents/ProductDetails";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/SubComponents/EditProduct";
import GoogleLogin from "./Components/GoogleLogin";


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

//Vi opretter vores tab i bunden
const TabNavigator = createBottomTabNavigator({

        //Fortæller bottom navigator hvilke komponenter den skal indeholde
        Login: {
        screen: GoogleLogin,
        navigationOptions: {
          tabBarLabel: "Login",
          tabBarIcon: ({tintColor}) => (
              <AntDesign name={"google"} size={24} color={tintColor}/>
          )

        },
      },
      Main: {
        screen: StackNavigator,
        navigationOptions: {
          tabBarLabel: "Produkter",
          tabBarIcon: ({tintColor}) => (
              <AntDesign name={'home'} size={24} color={tintColor}/>
          )
        },
      },
      Add: {
        screen: AddProduct,
        navigationOptions: {
          tabBarLabel: "Nyt produkt",
          tabBarIcon: ({tintColor}) => (
              <AntDesign name={'pluscircleo'} size={24} color={tintColor}/>
          )
        },
      },

      /*
            Camera: {
              screen: Camera,
              navigationOptions: {
                tabBarLabel: "Camera",
                tabBarIcon: ({tintColor}) => (
                    <AntDesign name={'camera'} size={24} color={tintColor}/>
                )
              },
            }
      */

    },
    {
      tabBarOptions: {
        showIcon:true,
        labelStyle: {
          fontSize: 15,
        },
        activeTintColor: 'darkblue',
        inactiveTintColor: 'gray',
        size:40
      }
    });
const AppContainer = createAppContainer(TabNavigator);

export default class App extends React.Component {
    //Opretter forbindelse til vores firebase
    componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyBzhmQLVF2SX-JOCj5ByGEeYX6SPXiD608",
      authDomain: "obaktivitet1.firebaseapp.com",
      databaseURL: "https://obaktivitet1.firebaseio.com",
      projectId: "obaktivitet1",
      storageBucket: "obaktivitet1.appspot.com",
      messagingSenderId: "1094098734207",
      appId: "1:1094098734207:web:cc153710b383277492c34a",
      measurementId: "G-6YGGC5MT4X"
    };
    // Initialize Firebase
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }

  }
  render() {
      //Returnere vores tab navigator
      return <AppContainer />;
  }
}