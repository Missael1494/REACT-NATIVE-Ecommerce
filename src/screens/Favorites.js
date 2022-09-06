import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getFavoriteApi } from '../api/favorite'
import { FavoriteList } from '../components/Favorites/FavoriteList'
import { ScreenLoading } from '../components/ScreenLoading'
import Search from '../components/Search/Search'
import { StatusBarCustom } from '../components/StatusBarCustom'
import useAuth from '../hooks/useAuth'
import colors from '../styles/colors'

export const Favorites = () => {
  const [products, setProducts] = useState(null)
  const [reloadFavorites, setReloadFavorites] = useState(false)
  const { auth } = useAuth()

  useFocusEffect(
    useCallback(() => {
      setProducts(null);
        (async () => {
          const response = await getFavoriteApi(auth)
          setProducts(response)
        })()
        setReloadFavorites(false)
      },
      [reloadFavorites],)
    
  )

  return (
    <>
      <StatusBarCustom backgorundColor={colors.bgDark} barStyle="light-content" />
      <Search />
          {!products ? (
            <ScreenLoading text="Cargando lista" />
          ) : size(products) === 0 ? (
            <View style={styles.container}>
              <Text style={styles.title} >Lista de favoritos</Text>
              <Text>No tienes productos en tu lista</Text>
            </View>
          ) : (
            <FavoriteList products={products} setReloadFavorites={setReloadFavorites} />
          )}
      
    </>
    
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
    }
})