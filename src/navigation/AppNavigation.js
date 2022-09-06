import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import AwesomeIcon from "react-native-vector-icons/FontAwesome"
import React from 'react'
//import { Account } from '../screens/Account';
import { AccountStack } from './AccountStack'

import { Cart } from '../screens/Cart';
import { Favorites } from '../screens/Favorites';
//import { Home } from '../screens/Product/Home';
import colors from '../styles/colors';
import { StyleSheet } from 'react-native';
import { ProductStack } from './ProductStack'

const Tab = createMaterialBottomTabNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator
            barStyle={styles.navigation}
            screenOptions={({route}) => ({
                tabBarIcon: (routeStatus) => {
                    return setIcon(route, routeStatus);
                }
            }) }
        >
            <Tab.Screen 
                name="home"
                component={ProductStack}
                options={{
                    title: "Inicio",
                }}
            />
            <Tab.Screen 
                name="favorites"
                component={Favorites}
                options={{
                    title: "Favorites",
                }}
            />
            <Tab.Screen 
                name="cart"
                component={Cart}
                options={{
                    title: "Cart",
                }}
            />

            <Tab.Screen 
                name="account"
                component={AccountStack}
                options={{
                    title: "Mi cuenta",
                }}
            />

        </Tab.Navigator>
    </NavigationContainer>
  )
}

const setIcon = (route, routeStatus) => {
    //console.log(route)
    //console.log(routeStatus)
    let iconName = "";

    switch (route.name) {
        case "home":
            iconName = "home";
            break;
        case "favorites":
            iconName = "heart";
            break;
        case "cart":
            iconName = "shopping-cart";
            break;
        case "account":
            iconName = "bars";
            break;
        default:
            break;
    }
    return <AwesomeIcon name={iconName} style={styles.icon} />

}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: colors.bgDark
    },
    icon: {
        fontSize: 20,
        color: colors.fontLight,
    }
})
