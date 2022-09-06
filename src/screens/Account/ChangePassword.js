import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import useAuth from '../../hooks/useAuth'
import { formStyles } from '../../styles'
import { useFormik } from "formik"
import * as Yup from "yup"
import { getMeApi, updateUserApi } from '../../api/user'

export const ChangePassword = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const {auth, logout} = useAuth();


    useFocusEffect(
        useCallback(
          () => {
            (async() => {
                const response = await getMeApi(auth.token)
                //console.log("respuesta en changename", response)
                await formik.setFieldValue("password", response.username)
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
                if ( response.statusCode ) throw "Error al cambiar contraseña"
                console.log("Okey -> Back")
                //navigation.goBack()
                logout()
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
                //formik.setFieldError("username", true)
                setLoading(false)

            }

        }
    })

  return (
    <View style={styles.content}>
        <TextInput 
            label="Nueva contraseña" 
            style={formStyles.input} 
            onChangeText={(text) => formik.setFieldValue("password", text)}
            value={formik.values.password}
            error={formik.errors.password}
            secureTextEntry
        />
        <TextInput 
            label="Repetir nueva contraseña" 
            style={formStyles.input} 
            onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
            secureTextEntry
        />
        <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit} loading={loading}>
            cambiar contraseña de usuario
        </Button>
    </View>
  )
}

const validationSchema = () => {
    return {
        password: Yup.string().min(4).required(true),
        repeatPassword: Yup.string().min(4, true).oneOf([Yup.ref("password")], true).required(true)
    }
}

const initialValues = () => {
    return {
        password: "",
        repeatPassword: "",
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 20,
    },
})
