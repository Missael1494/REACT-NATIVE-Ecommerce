import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const NotProducts = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>NotProducts</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    text: {
        fontSize: 16
    }
})