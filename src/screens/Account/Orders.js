import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { getOrdersApi } from '../../api/order'
import { ListOrder } from '../../components/Order/ListOrder'
import { StatusBarCustom } from '../../components/StatusBarCustom'
import useAuth from '../../hooks/useAuth'

export const Orders = () => {
    const [orders, setOrders] = useState(null)
    const {auth} = useAuth();
    

    useFocusEffect(
        useCallback(() => {
            (async () => {
              const response = await getOrdersApi(auth);
              setOrders(response)
            })()
          
            
          }, [])
    )
    
    

  return (
    <>
        <StatusBarCustom />
        <ScrollView  style={styles.container}>
            <Text style={styles.title}>Mis Pedidos</Text>
            
            {!orders ? (
                <ActivityIndicator size="large" style={styles.loading} />
            ) : size(orders) === 0 ? (
                <Text style={styles.noOrdersText}>No tienes pedidos</Text>
            ) : (
                <ListOrder orders={orders} />
            )}
        </ScrollView>
            
        
    </>
  )
}


var styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    title: {
      fontSize: 20,
    },
    addAddress: {
      borderWidth: 0.9,
      borderRadius: 5,
      borderColor: "#ddd",
      paddingHorizontal: 15,
      paddingVertical: 5,
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    noOrdersText: {
      textAlign: "center",
      paddingTop: 20,
      fontSize: 18,
    },
    loading: {
      marginTop: 20,
    },
  });
  
