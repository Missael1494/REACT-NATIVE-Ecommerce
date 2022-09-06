import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { formStyles } from '../../styles'
import { registerApi } from '../../api/user'
import Toast from "react-native-root-toast"

const RegisterForm = (props) => {
    const { changeForm } = props;
    const [loading, setLoading] = useState(false)

    
    const formik = useFormik({
        initialValues: initValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            //console.log("Registro de usuario enviado")
            //console.log(formData)
            setLoading(true)
            try {
                await registerApi(formData);
                //console.log("ok")
                changeForm();
            }
            catch {
                setLoading(false)
                console.log(error)
                Toast.show("Error al registrar el usuario", {
                    position: Toast.positions.CENTER,
                })
            
            }
        }
    })

  return (
    <View>
        <TextInput 
            label="Email" 
            style={formStyles.input} 
            onChangeText={(text) => formik.setFieldValue("email", text)}
            value={formik.values.email}
            error={formik.errors.email}
        />
        <TextInput 
            label="Nombre de Usuario" 
            style={formStyles.input} 
            onChangeText={(text) => formik.setFieldValue("username", text)}
            value={formik.values.username}
            error={formik.errors.username}
        />
        <TextInput 
            label="Contraseña" 
            style={formStyles.input} 
            secureTextEntry 
            onChangeText={(text) => formik.setFieldValue("password", text)}
            value={formik.values.password}
            error={formik.errors.password}
        />
        <TextInput 
            label="Repetir Contraseña" 
            style={formStyles.input} 
            secureTextEntry 
            onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
        />
        <Button 
            mode="contained" 
            style={formStyles.btnSuccess} 
            onPress={formik.handleSubmit}
            loading={loading}
        >
            Registrarse
        </Button>
        <Button
            mode='text'
            style={formStyles.btnText}
            labelStyle={formStyles.btnTextLabel}
            onPress={changeForm}
        >
            Iniciar sesión
        </Button>
    </View>
  )
}

const initValues = () => {
    return {
        email: "",
        username: "",
        password: "",
        repeatPassword: ""
    }
}

const validationSchema = () => {
    return {
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], true),
    }
}

export default RegisterForm