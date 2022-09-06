import { map } from 'lodash'
import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Product } from './Product';

export const FavoriteList = (props) => {
    const { products, setReloadFavorites } = props;

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>FavoriteList</Text>
        {map(products, (item) => (
            <Product key={item._id} item={item} setReloadFavorites={setReloadFavorites} />
        ) )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 5,
    },
})
