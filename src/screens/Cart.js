import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Colors } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getProductCartApi } from '../api/cart'
import { NotProducts } from '../components/Cart/NotProducts'
import { ScreenLoading } from '../components/ScreenLoading'
import { StatusBarCustom } from '../components/StatusBarCustom'
import colors from '../styles/colors'
import { ProductList } from '../components/Cart/ProductList'
import { getAddressesApi } from '../api/address'
import useAuth from '../hooks/useAuth'
import { AddressList } from '../components/Cart/AddressList'
import { Payment } from '../components/Cart/Payment'
import Search from '../components/Search/Search'

export const Cart = () => {
  const [cart, setCart] = useState(null)
  const [products, setProducts] = useState(null)
  const [reloadCart, setReloadCart] = useState(false)
  const [addresses, setAddresses] = useState(null)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [totalPayment, setTotalPayment] = useState(null)
  const {auth} = useAuth()

  useFocusEffect(
    useCallback(() => {
        setCart(null);
        setAddresses(null);
        setSelectedAddress(null);

        loadCart();
        loadAddresses();
      },[])
  )

  useEffect(() => {

    if(reloadCart) {
      loadCart()
      setReloadCart(false)
    }
  }, [reloadCart])
  

  const loadCart = async () => {
    const response = await getProductCartApi();
    setCart(response);

  }

  const loadAddresses = async () => {
    const response = await getAddressesApi(auth)
    setAddresses(response)
  }

  return (
    <>
      <StatusBarCustom backgroundColor={colors.bgDark} barStyle="light-content" />
      {!cart ? (
        <ScreenLoading size="large" text="Cargando carrito" />
      ) : size(cart)  === 0 ? (
        <>
          <Search />
          <NotProducts />
        </>
        
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView style={styles.cartContainer} >
            <ProductList 
              cart={cart} 
              products={products} 
              setProducts={setProducts} 
              setReloadCart={setReloadCart} 
              setTotalPayment={setTotalPayment}
            />
            <AddressList 
              addresses={addresses} 
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <Payment 
              products={products} 
              selectedAddress={selectedAddress}
              totalPayment={totalPayment}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
      )}
    </>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }, 
    cartContainer: {
      padding: 10,
    }
})