import { StatusBar } from 'expo-status-bar';
import jwtDecode from 'jwt-decode';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Provider as PaperProvider } from "react-native-paper"
import { getTokenApi, removeTokenApi, setTokenApi } from './src/api/token';
import AuthContext from './src/context/AuthContext';
import { AppNavigation } from './src/navigation/AppNavigation';
//import { Test } from './src/components/Test';
import AuthScreen from './src/screens/Auth'


export default function App() {

  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    ( async () => {
        const token = await getTokenApi();
        if(token) {

          setAuth({
            token,
            idUser: jwtDecode(token).id  //decodificamos el id de ese token
          });
        } else {
          setAuth(null);
        }
    }) ()
  }, [])
  
  const login = (user) => {
    //console.log(user)
    setTokenApi(user.jwt)
    setAuth({
      token: user.jwt,
      idUser: user.user._id
    })
  }

  const logout = () => {
    if(auth) {
      removeTokenApi();
      setAuth(null);
    }
  }

  const authData = useMemo(
    () => ({
      auth,
      login, //() => null, ya se asocio a la funcion de arriba cont login
      logout //() => null,
    }),
    [auth]
  )

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>

        {
          auth 
          ? 
            (
              <AppNavigation />
            )
          : 
            (<AuthScreen />)
        }
      </PaperProvider>
    </AuthContext.Provider>
    
    
  );
}

const styles = StyleSheet.create({
  
  
});
