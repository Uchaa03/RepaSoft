import api from "@/helpers/axios.js";

//Login Request
export const loginRequest = async (email, password) => {
    try{
        const response = await api.post("/login", {
            email: email,
            password: password,
        });

        return {
            success: true,
            response: response.data
        }
    }catch (error) {
        return {
            success: false,
            error: error.response?.status === 401 ? 'Credenciales inválidas' : 'Error de conexión'        }
    }
}

//Registe Technician Request
export const registerRequest = async (name, email, password) => {
    try {
        const response = await api.post("/technician/register", {
            name: name,
            email: email,
            password: password
        });

        return {
            success: true,
            response: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.status === 422 ? 'Ya existe ese técnico' :
                error.response?.status === 400 ? 'Datos incorrectos' : 'Error de conexión'
        };
    }
};

//Send Message
export function sendMessage() {
    return console.log("Mensaje de contacto enviado")
}