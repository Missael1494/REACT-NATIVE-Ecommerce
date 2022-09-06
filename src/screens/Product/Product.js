import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { getProductApi } from '../../api/product';
import { Buy } from '../../components/Product/Buy';
import { CarouselImages } from '../../components/Product/CarouselImages';
import  {Favorite}  from '../../components/Product/Favorite';
import { Price } from '../../components/Product/Price';
import  Quantity  from '../../components/Product/Quantity';
import { ScreenLoading } from '../../components/ScreenLoading';
import Search from '../../components/Search';
import { StatusBarCustom } from '../../components/StatusBarCustom';
import colors from '../../styles/colors';

export const Product = (props) => {
    const { route } = props;
    const { params } = route;
    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
      (async() => {
        setProduct(null) // para mostar el cargando
        const response = await getProductApi(params.idProduct)
        setProduct(response)

        const arrayImages = [response.main_image];
        arrayImages.push(...response.images);
        setImages(arrayImages);
      } )()
    
      
    }, [params])
    

  return (
    <>
        <StatusBarCustom backgroundColor={colors.bgDark} barstyle="light-content" />
        <Search />
        {!product ? (
            <ScreenLoading text="Cargando producto" size="large" />
        ) : (
            <ScrollView style={styles.container}>
                <Text style={styles.title} >{product.title}</Text>
                <CarouselImages images={images}/>
                <View style={styles.containerView} >
                    <Price price={product.price} discount={product.discount} />
                    <Quantity quantity={quantity} setQuantity={setQuantity} />
                    <Buy product={product} quantity={quantity} />
                    <Favorite product={product} />
                </View>
            </ScrollView>
        )}
        
    </>
    
  )
}


const styles = StyleSheet.create({
    container: {
        //padding: 10,
        paddingBottom: 50,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        padding: 10
    },
    containerView: {
        padding: 10
    }
})