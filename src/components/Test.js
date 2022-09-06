import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'



export const Test = () => {
  return (
    <View>
        <Text>Estamos en Test Component</Text>
        <Button onPres={() => console.log('hola')} >ClickMe</Button>
    </View>
  )
}
