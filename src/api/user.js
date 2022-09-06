import { API_URL } from "../utils/constants";

export const registerApi = async (formData) => {
    try {
        const url = `${API_URL}/auth/local/register`; // en esta url es la que maneja estrapi para hace el registro no ahorra el registro
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        //return null;
    }
}


export const loginApi = async (formData) => {
    try {
        const url = `${API_URL}/auth/local`; //formik hace el trabajo de registro y login
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params);
        const result = await response.json();  //result nos devuelve jwt un identificador de usuario
        return result;
    } catch (error) {
        console.log(error);
        //return null;
    }
}


export async function getMeApi (token) {
    try {
        const url = `${API_URL}/users/me`;
        const params = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        //console.log(error)
        return null;
    }
}

export const updateUserApi = async (auth, formData) => {
    try {
        const url = `${API_URL}/users/${auth.idUser}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.token}`,
            },
            body: JSON.stringify(formData)
        };
        const response = await fetch(url, params);
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error);
        return null
    }
}