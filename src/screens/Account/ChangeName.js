import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useFormik } from "formik"
import * as Yup from "yup"
import { formStyles } from '../../styles'
import useAuth from '../../hooks/useAuth'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getMeApi, updateUserApi } from '../../api/user'
import Toast from 'react-native-root-toast'

export const ChangeName = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const {auth} = useAuth()
    

    useFocusEffect(
        useCallback(
          () => {
            (async() => {
                const response = await getMeApi(auth.token)
                //console.log("respuesta en changename", response)
                if(response.name && response.lastname) {
                    await formik.setFieldValue("name", response.name)
                    await formik.setFieldValue("lastname", response.lastname)
                }
                

            })();
          },
          [],
        )
        
    )

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            
            try {
                await updateUserApi(auth, formData)
                //console.log("ok")
                navigation.goBack()
            } catch (error) {
                Toast.show("Error al actualizar los datos.", {
                    position: Toast.positions.CENTER
                })
                setLoading(false)

            }
        }

    })

  return (
    <View style={styles.container} >
        <TextInput 
            label="Nombre"
            style={formStyles.input}
            onChangeText={(text) => formik.setFieldValue("name", text)}
            value={formik.values.name}
            error={formik.errors.name}
        />
        <TextInput 
            label="Apellidos"
            style={formStyles.input}
            onChangeText={(text) => formik.setFieldValue("lastname", text)}
            value={formik.values.lastname}
            error={formik.errors.lastname}

        />
        <Button
            mode="contained"
            style={formStyles.btnSuccess}
            onPress={formik.handleSubmit}
            loading={loading}
        >
            Cambiar nombre y apellidos
        </Button>
        
    </View>
  )
}


const initialValues = () => {
    return {
        name: "", 
        lastname: "",
    }
}

const validationSchema = () => {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true)
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})

