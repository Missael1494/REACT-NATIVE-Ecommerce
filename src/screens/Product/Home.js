import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Banners } from '../../components/Home/Banners'
import { NewProducts } from '../../components/Home/NewProducts'
import Search from '../../components/Search'
import { StatusBarCustom } from '../../components/StatusBarCustom'
import colors from '../../styles/colors'


export const Home = () => {
  return (
    <>
      <StatusBarCustom backgroundColor={colors.bgDark}  barStyle="light-content" />
      <Search />
      <ScrollView>
        <Banners />
        <NewProducts />
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})