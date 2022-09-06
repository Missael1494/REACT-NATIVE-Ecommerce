import React, { useState } from 'react'
import { View } from 'react-native'
import { formStyles } from '../../styles'
import { Button, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from "yup";
import Toast from 'react-native-root-toast'
import { loginApi } from '../../api/user'
import useAuth from '../../hooks/useAuth'


export const LoginForm = (props) => {
    const { changeForm } = props;
    const [loading, setLoading] = useState(false)
    //const auth = useAuth();
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            //console.log(formData)  }
            setLoading(true);
            try {
                const response = await loginApi(formData)
                if(response.statusCode) throw "Error en el Usuario o contraseña"
                //console.log(response)
                login(response) //mandar datos del hijo al padre  un ejemplo de esto va hacia app.js y se hace la autenticacion del token
            } catch (error) {
                Toast.show("Error en el login", {
                    position: Toast.positions.CENTER
                });
                setLoading(false)
            }
            setLoading(false)
        }
    })

  return (
    <View>
       <TextInput 
            label="Email o Username" 
            style={formStyles.input} 
            onChangeText={(text) => formik.setFieldValue("identifier", text)}
            value={formik.values.identifier} // debe ser identifier
            error={formik.errors.identifier}
        /> 
       <TextInput 
            label="Contraseña" 
            style={formStyles.input} 
            onChangeText={(text) => formik.setFieldValue("password", text)}
            value={formik.values.password}
            error={formik.errors.password}
            secureTextEntry
        /> 
       <Button 
            mode="contained" 
            style={formStyles.btnSuccess}
            onPress={formik.handleSubmit}
            loading={loading}
        >
            Entrar
        </Button>
       <Button 
            mode="text" 
            style={formStyles.btnText}
            labelStyle={formStyles.btnTextLabel}
            onPress={changeForm}
        >
            Registrarse
        </Button>

    </View>
  )
}

const initialValues = () => {
    return {
        identifier: "",
        password: "",
    }
}


const validationSchema = () => {
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true),
    }
}