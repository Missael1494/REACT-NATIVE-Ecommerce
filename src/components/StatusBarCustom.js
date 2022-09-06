import React from 'react'
import { View, SafeAreaView, StatusBar } from 'react-native'

export const StatusBarCustom = (props) => {
    const { backgroundColor, ...rest} = props;

  return (
    <>
        <StatusBar backgroundColor={backgroundColor} {...rest} />
        <SafeAreaView 
            style={{
                flex: 0,
                backgroundColor: backgroundColor,
            }} 
        />
    </>
  )
}
