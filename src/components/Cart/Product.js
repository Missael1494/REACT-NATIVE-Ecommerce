import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper';
import { decreaseProductCartApi, deleteProductCartAopi, increaseProductCartApi } from '../../api/cart';
import colors from '../../styles/colors';
import { API_URL } from '../../utils/constants';

export const Product = (props) => {
    const {product, setReloadCart} = props;
    console.log("producto.TITLE", product.title)

    const calcPrice = (price, discount) => {
        if(!discount) return price

        const discountAmount = (price * discount) / 100;
        return (price - discountAmount).toFixed(2)
    }

    const deleteProductCart = async () => {
        const response = await deleteProductCartAopi(product._id)
        if(response) setReloadCart(true)
    }

    const increaseProductCart = async () => {
        const response = await increaseProductCartApi(product._id)
        if(response) setReloadCart(true)
    }

    const decreaseProductCart = async () => {
        const response = await decreaseProductCartApi(product._id)
        if(response) setReloadCart(true)
    }

  return (
    <View style={styles.product}>
        <View style={styles.containerImage}>
            <Image 
                style={styles.image}
                source={{ uri: `${API_URL}${product.main_image.url}`}}
            />
        </View>

        <View style={styles.info} >
            <View>
                <Text 
                    style={styles.name}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                >
                    {product.title}
                </Text>
                <View style={styles.prices}>
                    <Text style={styles.currentPrice}>
                        ${calcPrice(product.price, product.discount)} MXN
                    </Text>
                </View>
                {product.discount && (
                    <View style={styles.containerDiscount}>
                        <Text style={styles.discountText}>Ahorras: </Text>
                        <Text style={styles.discountValue}>
                            ${((product.price * product.discount) /100).toFixed(2)} MXN {''}
                            {product.discount}%
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.btnsContainer}>
                <View style={styles.selectQuantity}>
                    <IconButton
                        icon="plus"
                        color="#fff"
                        size={19}
                        style={styles.btnQuantity}
                        onPress={increaseProductCart}
                    />
                    <TextInput
                        value={product.quantity.toString()}
                        style={styles.inputQuantity}
                        size={19}

                    />
                    <IconButton
                        icon="minus"
                        color="#fff"
                        size={19}
                        style={styles.btnQuantity}
                        onPress={decreaseProductCart}
                    />
                </View>
                <Button 
                    color="#b12704" 
                    mode="contained" 
                    onPress={deleteProductCart}> 
                    Eliminar
                </Button>
            </View>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#dadde1",
    },
    containerImage: {
        width: "40%",
        height: 170,
        backgroundColor: "ebebeb",
        padding: 7,
    },
    image: {
        height: "100%",
        resizeMode: "contain"
    },
    info: {
        padding: 10,
        width: "60%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 16
    },
    prices: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: "flex-end"
    },
    currentPrice: {
        fontSize: 18,
        color: "#b12704"
    },
    btnsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
        alignItems: "center"
    },
    selectQuantity: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    btnQuantity: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        margin: 1,
    },
    inputQuantity: {
        paddingHorizontal: 3,
        paddingVertical: 0,
        fontSize: 16,
        margin: 0,
        textAlign: 'center',
        
    },
    containerDiscount: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
    },
    discountText: {
        fontSize: 14,
        color: '#747474'
    },
    discountValue: {
        fontSize: 14,
        color: "#747474",
        paddingLeft: 5,
    }

})

