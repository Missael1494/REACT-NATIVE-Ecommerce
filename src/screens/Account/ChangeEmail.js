import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { getMeApi, updateUserApi } from '../../api/user'
import { formStyles } from '../../styles'
import Toast from 'react-native-root-toast'
import useAuth from '../../hooks/useAuth'

export const ChangeEmail = () => {
    const {auth} = useAuth()
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(
          () => {
            (async() => {
                const response = await getMeApi(auth.token)
                //console.log("respuesta en changename", response)
                await formik.setFieldValue("email", response.email)
            })();
          },[],)
    )

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)

            try {
                const response = await updateUserApi(auth, formData)
                if ( response.statusCode ) throw "El email ya existe"
                console.log("Okey -> Back")
                navigation.goBack()
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
                formik.setFieldError("email", true)
                setLoading(false)

            }

        }
    })


  return (
    <View style={styles.container} >
        <TextInput 
            label="Email"
            style={formStyles.input}
            onChangeText={(text) => formik.setFieldValue("email", text)}
            value={formik.values.email}
            error={formik.errors.email}
        />
        <Button mode="contained" style={formStyles.btnSuccess} onPress={formik.handleSubmit} loading={loading}> 
            Cambiar email
        </Button>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})

const validationSchema = () => {
    return {
        email: Yup.string().email(true).required()
    }
}

const initialValues = () => {
    return {
        email: ""
    }
}
