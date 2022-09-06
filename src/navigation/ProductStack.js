import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { Text } from 'react-native'
import { Home } from '../screens/Product/Home';
import { Product } from '../screens/Product/Product';
import Search from '../screens/Product/Search';
import colors from '../styles/colors';

const Stack = createStackNavigator();

export const ProductStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerTintColor: colors.fontLight,
            headerStyle: {backgroundColor: colors.bgDark},
            cardStyle: {
                backgroundColor: colors.bgLight
            }
        }}
    >
        <Stack.Screen 
            name="home-1"
            component={Home}
            options={{ headerShown: false }}
        />
        <Stack.Screen 
            name="product"
            component={Product}
            options={{ headerShown: false }}
        />
        <Stack.Screen 
            name="search"
            component={Search}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
  )
}
