import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'
import  {Account}  from '../screens/Account/Account';
import { AddAddress } from '../screens/Account/AddAddress';
import { Addresses } from '../screens/Account/Addresses';
import { ChangeEmail } from '../screens/Account/ChangeEmail';
import { ChangeName } from '../screens/Account/ChangeName';
import { ChangePassword } from '../screens/Account/ChangePassword';
import { ChangeUsername } from '../screens/Account/ChangeUsername';
import { Orders } from '../screens/Account/Orders';
import colors from '../styles/colors';


const Stack = createStackNavigator();

export const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: {backgroundColor: colors.bgDark},
        cardStyle: {
          backgroundColor: colors.bgLight,
        }
      }}
    >
        <Stack.Screen 
            name="account-1"
            component={Account}
            options={{ title: "cuenta", headerShown: false}}
        />
        <Stack.Screen 
            name="change-name"
            component={ChangeName}
            options={{ title: "Cambiar nombre y apellidos"}}
        />
        <Stack.Screen 
            name="change-email"
            component={ChangeEmail}
            options={{ title: "Cambiar email"}}
        />
        <Stack.Screen 
            name="change-username"
            component={ChangeUsername}
            options={{ title: "Cambiar username"}}
        />
        <Stack.Screen 
            name="change-password"
            component={ChangePassword}
            options={{ title: "Cambiar password"}}
        />
        <Stack.Screen 
            name="addresses"
            component={Addresses}
            options={{ title: "Mis direcciones"}}
        />
        <Stack.Screen 
            name="add-address"
            component={AddAddress}
            options={{ title: "Nueva dirección"}}
        />
        <Stack.Screen 
            name="orders"
            component={Orders}
            options={{ title: "Mis Pedidos"}}
        />
    </Stack.Navigator>
  )
}
