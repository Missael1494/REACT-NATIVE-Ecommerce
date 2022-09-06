import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const Price = (props) => {
    const { price, discount } = props;

    const calcPrice = (price, discount) => {
        if(!discount) return price;

        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(2);
    }

  return (
    <View>
        {discount && (
            <View style={styles.containerData} >
                <Text style={styles.dataText} >Precio recomendado: </Text>
                <Text style={[styles.dataValue, styles.oldPrice]}>${price} MXN </Text>
            </View>
        )}

        <View style={styles.containerData}>
            <Text style={styles.dataText}>Price: </Text>
            <Text style={[styles.dataValue, styles.currentPrice]}>${calcPrice(price, discount)} MXN</Text>
        </View>

        {discount && (
            <View style={styles.containerData} >
                <Text style={styles.dataText}>Ahorras:</Text>
                <Text style={[styles.dataValue, styles.saving]}>
                    {((price * discount) / 100).toFixed(2)} MXN ({discount}%) 
                </Text>
            </View>
        )}
    </View>
  )
}


const styles = StyleSheet.create({
    containerData: {
        flexDirection: "row",
        alignItems: "center",
        //justifyContent: "center",
        paddingVertical: 5,
    },
    dataText: {
        width: "45%",
        fontSize: 16,
        color: "#747474",
        textAlign: "right"
    },
    dataValue: {
        width: "55%",
        fontSize: 18,
        //paddingBottom: 5,
    },
     oldPrice: {
        textDecorationLine: "line-through",
     },
     currentPrice: {
        fontSize: 23,
        color: "#bc0e0d"
     },
     saving: {
        color: "#bc0e0d"
     }
})