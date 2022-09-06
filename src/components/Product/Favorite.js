import { size } from 'lodash';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { addFavoriteApi, deleteFavoriteApi, isFavoriteApi } from '../../api/favorite';
import useAuth from '../../hooks/useAuth';

export const Favorite = (props) => {
    const { product } = props;
    const [isFavorite, setIsFavorite] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth();

    useEffect(() => {
      (async () => {
        const response = await isFavoriteApi(auth, product._id)
        if(size(response) === 0) setIsFavorite(false)
        else setIsFavorite(true)
      })()
    
    }, [product])
    

    const addFavorite = async () => {
      console.log("hola")
      if(!loading) {
        setLoading(true)
        try {
          await addFavoriteApi(auth, product._id)
          setIsFavorite(true)
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
      }
    }

    const deleteFavorite = async () => {
      console.log("Borrar")
      if(!loading) {
        setLoading(true)
        await deleteFavoriteApi(auth, product._id)
        setIsFavorite(false)
        
      }
    }

    if(isFavorite === undefined) return null;

  return (
    <View style={{ zIndex: 1 }}>
        <Button
            mode="contained"
            contentStyle={isFavorite ? styles.btnDeleteFavoritesContent : styles.btnAddFavoritesContent}
            labelStyle={styles.btnLabel}
            style={styles.btn}
            onPress={ isFavorite ? deleteFavorite : addFavorite}
            loading={loading}
        >
            {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
        </Button>
    </View>
    
  )
}


const styles = StyleSheet.create({
    btnAddFavoritesContent: {
        backgroundColor: "#057b00",
        paddingVertical: 5
    },
    btnDeleteFavoritesContent: {
      backgroundColor: "#c40000",
      paddingVertical: 5,
    },
    btnLabel: {
        fontSize: 18,

    },
    btn: {
        marginTop: 20
    }
})


