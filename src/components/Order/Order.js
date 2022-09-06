import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import useAuth from '../../hooks/useAuth';
import { API_URL } from '../../utils/constants';

export const Order = (props) => {
    const {order} = props;
    //const {auth} =useAuth()

    //console.log("authTOKEN", auth.token)


    //console.log("authid", auth.idUser)
    console.log("ORDER", order.quantity);

  return (
    <View style={styles.container}>
        <View style={styles.containerImage}>
            <Image 
                style={styles.image}
                source={{uri: `${API_URL}${order.product.main_image.url}`}}
            />
        </View>
        <View style={styles.info}>
            <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">{order.product.title}</Text>
            <Text>Cantidad: {order.quantity}</Text>
            <Text>Total pagado: ${order.productsPayment} MXN</Text>
        </View>
        
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderColor: "#ddd",
      marginHorizontal: -20,
      paddingVertical: 5,
      flexDirection: "row",
    },
    containerImage: {
      width: "30%",
      height: 120,
      padding: 10,
    },
    image: {
      height: "100%",
      resizeMode: "contain",
    },
    info: {
      width: "70%",
      justifyContent: "center",
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
  });
  
