import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const ResultNotFound = (props) => {
    const {search} = props;

  return (
    <View style={styles.container}>
        <Text style={styles.searchTeaxt} >No hay resultados para {search}</Text>
        <Text style={styles.otherText}>Revisa la ortografía o usa términos más generales.</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    searchTeaxt: {
        fontSize: 18,
        fontWeight: "bold",
    },
    otherText: {
        fontSize: 14,
        paddingTop: 5,
    }
})