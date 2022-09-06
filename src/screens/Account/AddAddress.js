import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, TextInput } from 'react-native-paper'
import { formStyles } from '../../styles'
import { useFormik } from "formik"
import * as Yup from "yup"
import useAuth from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { addAddressApi, getAddressApi, getAddressesApi, updateAddressApi } from '../../api/address'


export const AddAddress = (props) => {
    const {route: {params}} = props;
    const [loading, setLoading] = useState(false)
    const [newAddress, setNewAddress] = useState(true)
    const {auth} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
      (async () => {
        if(params?.idAddress) {
            setNewAddress(false)
            navigation.setOptions({ title: "Actualiza dirección"})
            const response = await getAddressApi(auth, params.idAddress);
            await formik.setFieldValue("_id", response._id)
            await formik.setFieldValue("title", response.title)
            await formik.setFieldValue("name_lastname", response.name_lastname)
            await formik.setFieldValue("address", response.address)
            await formik.setFieldValue("postal_code", response.postal_code)
            await formik.setFieldValue("city", response.city)
            await formik.setFieldValue("country", response.country)
            await formik.setFieldValue("state", response.state)
            await formik.setFieldValue("phone", response.phone)
            //setNewAddress(true)
        }
      } )()
    
      
    }, [params])
    

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)

            try {
                if(newAddress) await addAddressApi(auth, formData)
                else await updateAddressApi(auth, formData)
                navigation.goBack()
            } catch (error) {
                setLoading(false)
                console.log(error)
            }


        }
    })

  return (
    <KeyboardAwareScrollView extraScrollHeight={25} >
        <View style={styles.container} >
            <Text style={styles.title} >Nueva dirección</Text>
            <TextInput 
                label="Titulo" 
                style={formStyles.input} 
                onChangeText={ (text) => formik.setFieldValue("title", text) } 
                value={formik.values.title}
                error={formik.errors.title}
            />
            <TextInput 
                label="Nombre y apellidos" 
                style={formStyles.input} 
                onChangeText={ (text) => formik.setFieldValue("name_lastname", text) } 
                value={formik.values.name_lastname}
                error={formik.errors.name_lastname}
            />
            <TextInput 
                label="Dirección" 
                style={formStyles.input} 
                onChangeText={ (text) => formik.setFieldValue("address", text) } 
                value={formik.values.address}
                error={formik.errors.address}
            />
            <TextInput 
                label="Codigo Postal" 
                style={formStyles.input} 
                onChangeText={ (text) => formik.setFieldValue("postal_code", text) } 
                value={formik.values.postal_code}
                error={formik.errors.postal_code}
            />
            <TextInput 
                label="Población" 
                style={formStyles.input} 
                onChangeText={ (text) => formik.setFieldValue("city", text) } 
                value={formik.values.city}
                error={formik.errors.city}
            />
            <TextInput 
                label="Estado" 
                style={formStyles.input} 
                onChangeText={ (text) => formik.setFieldValue("state", text) } 
                value={formik.values.state}
                error={formik.errors.state}
            />
            <TextInput 
                label="País" 
                style={formStyles.input} 
                onChangeText={ (text) => formik.setFieldValue("country", text) } 
                value={formik.values.country}
                error={formik.errors.country}
            />
            <TextInput 
                label="Teléfono" 
                style={formStyles.input} 
                onChangeText={ (text) => formik.setFieldValue("phone", text) } 
                value={formik.values.phone}
                error={formik.errors.phone}
            />
            <Button 
                mode='contained' 
                style={[formStyles.btnSuccess, styles.btnSuccess]} 
                onPress={formik.handleSubmit}
                loading={loading}
                
            >
                {newAddress ? "Crear dirección" : "Actualizar direccion" }
            </Button>
        </View>
    </KeyboardAwareScrollView>
  )
}


const initialValues = () => {
    return {
        title: "",
        name_lastname: "",
        address: "",
        postal_code: "",
        city: "",
        state: "",
        country: "",
        phone: "",
    }
}

const validationSchema = () => {
    return {
        title: Yup.string().required(),
        name_lastname: Yup.string().required(),
        address: Yup.string().required(),
        postal_code: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        country: Yup.string().required(),
        phone: Yup.string().required(),
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        paddingVertical: 20.
    },
    btnSuccess: {
        marginBottom: 20,
    }
})