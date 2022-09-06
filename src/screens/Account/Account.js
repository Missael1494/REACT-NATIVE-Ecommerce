import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { getMeApi } from '../../api/user'
import { Menu } from '../../components/Account/Menu'
import { UserInfo } from '../../components/Account/UserInfo'
import { ScreenLoading } from '../../components/ScreenLoading'
import Search from '../../components/Search'
import { StatusBarCustom } from '../../components/StatusBarCustom'
import useAuth from '../../hooks/useAuth'
import colors from '../../styles/colors'



export const Account = () => {

  const [user, setUser] = useState(null);
  const { auth } = useAuth();
  //console.log(auth)
  //console.log(auth.token)

  useFocusEffect( //con este hook podemos hacer una llamada cada vez que entro a este componente
    useCallback(() => {
      (async () => {
        //setUser(null) //para mostrar el spiner de cargado de Screen loading es opcional
        const response = await getMeApi(auth.token);
        console.log('respuesta', response) // me devuel los datos del usurio id username id etc
        setUser(response)
      })();
    }, [])
  )//

  return (
    <>
      {!user
        ?
          (
            <ScreenLoading size="large" />
          )
        :
          (
            <>
              <StatusBarCustom backgroundColor={colors.bgDark} />
              <Search />
              <ScrollView contentContainerStyle={styles.container}>
                  <UserInfo user={user} />
                  <Menu />
              </ScrollView>
            </>
          )
      }
    </>
    
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
    }
})