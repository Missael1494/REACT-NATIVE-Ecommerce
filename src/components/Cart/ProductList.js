import { map } from 'lodash';
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getProductCartApi } from '../../api/cart';
import { getProductApi } from '../../api/product';
import { ScreenLoading } from '../ScreenLoading';
import { Product } from './Product';

export const ProductList = (props) => {
    const {cart, products, setProducts, setReloadCart, setTotalPayment} = props;

    const calcPrice = (price, discount) => {
        if(!discount) return price;

        const discountAmount = (price * discount) / 100;
        return (price -discountAmount).toFixed(2);
    }

    useEffect(() => {
      (async () => {
        setProducts(null)
        const productTemp = [];
        let totalPaymentTemp = 0;

        for await (const product of cart) {
            const response = await getProductApi(product.idProduct);
            response.quantity = product.quantity;
            productTemp.push(response);
            
            const priceProduct = calcPrice(response.price, response.discount)
            
            totalPaymentTemp += priceProduct * response.quantity;
        }

        setProducts(productTemp)
        setTotalPayment(totalPaymentTemp)
      })()
    
      
    }, [cart])
    

  return (
    <View>
        <Text style={styles.title} >Productos:</Text>
        {!products ? (
            <ScreenLoading text="Cargando carrito" size="large" />
        ) : (
            map(products, (product) => <Product key={product._id} product={product} setReloadCart={setReloadCart} />)
        )}
    </View>
  )
}

// function calcPrice(price, discount) {
//     if(!discount) return price

//     const discountAmount = (price * discount) / 100;
//     return (price - discountAmount).toFixed(2)
// }

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold"
    }
})
