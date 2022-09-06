import { useNavigation } from '@react-navigation/native';
import { size } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getBannersApi } from '../../api/home-banner'
import { API_URL } from '../../utils/constants';

const width = Dimensions.get("window").width;
const height = 200;

export const Banners = () => {
    const [banners, setBanners] = useState(null)
    const [imageActive, setImageActive] = useState(0)
    const navigation = useNavigation();


    useEffect(() => {
      (async () => {
        const response = await getBannersApi()
        setBanners(response)
      })()
    
    }, [])
    

    if(!banners) return null;
    console.log("banners", banners[0].banner.url)
    const renderItem = ({ item }) => {
        return (
        <TouchableWithoutFeedback onPress={() => goToProduct(item.product._id)}>
            <Image 
                style={styles.carousel}
                source={{ uri: `${API_URL}${item.banner.url}` }}
            />
        </TouchableWithoutFeedback>
        )
    }

    const goToProduct = (id) => {
        navigation.push("product", { idProduct: id })
    }

  return (
    <View style={styles.container} >
        <Carousel 
            layout={"default"}
            data={banners}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderItem}
            onSnapToItem={(index) => setImageActive(index) }
        />
        <Pagination 
            dotsLength={size(banners)}
            activeDotIndex={imageActive}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.6}
            containerStyle={styles.dotsContainer}
            dotStyle={styles.dot}
            inactiveDotStyle={styles.dot}
            //dotColor={styles.dot}

        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        position: "relative"
    },
    carousel: {
        width,
        height,
        resizeMode: "contain"

    },
    dotsContainer: {
        position: "absolute",
        bottom: 10,
        width: "100%",
    },
    dot: {
        backgroundColor: "#fff"
    }
})
