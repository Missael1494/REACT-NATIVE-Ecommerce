import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { List } from 'react-native-paper'
import useAuth from '../../hooks/useAuth';

export const Menu = () => {
    const navigation = useNavigation();
    const {logout} = useAuth();


    const logoutAccount = () => {
        Alert.alert(
            "Cerrar sesión",
            "Estas seguro de que quiere salir de tu cuenta?",
            [
                {
                    text: "NO"
                },
                {
                    text: "SI",
                    onPress: logout,        
                }
            ]
        )
    }

  return (
    <>
        <ScrollView>
        <List.Section>
            <List.Subheader>Mi cuenta</List.Subheader>
            <List.Item 
                title="cambiar nombre"
                description="Cambia el nombre de tu cuenta"
                left={(props) => <List.Icon {...props} icon="plus" />}
                onPress={() => navigation.navigate("change-name")}
            />
            <List.Item 
                title="Cambiar email"
                description="Cambia el email de tu cuenta"
                left={(props) => <List.Icon {...props} icon="at" />}
                onPress={() => navigation.navigate("change-email")}
            />
            <List.Item 
                title="Cambiar username"
                description="Cambia el nombre de usuario de tu cuenta"
                left={(props) => <List.Icon {...props} icon="sim" />}
                onPress={() => navigation.navigate("change-username") }
            />
            <List.Item 
                title="Cambiar la contraseña"
                description="Cambia la contraseña de tu cuenta"
                left={(props) => <List.Icon {...props} icon="key" />}
                onPress={() => navigation.navigate("change-password")}
            />
            <List.Item 
                title="Mis direcciones"
                description="Administra tus direcciones de envio"
                left={(props) => <List.Icon {...props} icon="map" />}
                onPress={() => navigation.navigate("addresses")}
            />
        </List.Section>


        <List.Section>
            <List.Subheader>App</List.Subheader>
            <List.Item 
                title="Mis Pedidos"
                description="Listado de todos los pedidos"
                left={(props) => <List.Icon {...props} icon="clipboard-list" />}
                onPress={() => navigation.navigate("orders")}
            />
            <List.Item 
                title="Lista de deseos"
                description="Listado de todos los productos que te quieres comprar"
                left={(props) => <List.Icon {...props} icon="heart" />}
                onPress={() => navigation.navigate("favorites")}
            />
            <List.Item 
                title="Cerrar sesión"
                description="Cierra esta sesión e inicia con otra"
                left={(props) => <List.Icon {...props} icon="logout" />}
                onPress={ logoutAccount}
            />
        </List.Section>
        </ScrollView>
        
    </>
    
  )
}
