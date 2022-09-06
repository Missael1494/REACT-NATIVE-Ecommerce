import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import useAuth from '../../hooks/useAuth'
import { formStyles } from '../../styles'
import { useFormik } from "formik"
import * as Yup from "yup"
import { getMeApi, updateUserApi } from '../../api/user'

export const ChangeUsername = () => {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    const {auth} = useAuth();


    useFocusEffect(
        useCallback(
          () => {
            (async() => {
                const response = await getMeApi(auth.token)
                //console.log("respuesta en changename", response)
                await formik.setFieldValue("username", response.username)
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
                if ( response.statusCode ) throw "El username ya existe"
                console.log("Okey -> Back")
                navigation.goBack()
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
                formik.setFieldError("username", true)
                setLoading(false)

            }

        }
    })

  return (
    <View style={styles.content}>
        <TextInput 
            label="Nomre de usuario" 
            style={formStyles.input} 
            onChangeText={(text) => formik.setFieldValue("username", text)}
            value={formik.values.username}
            error={formik.errors.username}
        />
        <Button mode='contained' style={formStyles.btnSuccess} onPress={formik.handleSubmit} loading={loading}>
            cambiar nombre de usuario
        </Button>
    </View>
  )
}

const validationSchema = () => {
    return {
        username: Yup.string().min(4, true).required(true)
    }
}

const initialValues = () => {
    return {
        username: "",
    }
}

const styles = StyleSheet.create({
    content: {
        padding: 20,
    },
})
