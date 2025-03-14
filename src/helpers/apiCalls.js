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


//Change Password request
export const changePasswordRequest = async (currentPassword, newPassword, clientToken) => {
    try{
        const response = await api.post("/client/change-password", {
            current_password: currentPassword,
            new_password: newPassword,
        },{
            headers: {
                Authorization: `Bearer ${clientToken}`
            }
        })

        return {
            success: true,
            response: response.data.message
        }
    }catch (error) {
        return {
            success: false,
            status: error.response?.status,
            error: error.response?.data?.message || 'Error al cambiar la contraseña'     }
    }
}

//Search Client by email
export async function searchClientRequest(email, techToken) {
    try {
        const response = await api.get("/client/search", {
            params: { email },
            headers: {
                Authorization: `Bearer ${techToken}`,
            },
        });

        return {
            success: true,
            client: response.data.client,
        };
    } catch (error) {
        console.error('Error searching client:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error al buscar cliente',
        };
    }
}

//Create Client in repair
export async function createClientRequest(clientData, techToken) {
    try {
        const response = await api.post("/client/register", clientData, {
            headers: {
                Authorization: `Bearer ${techToken}`,
            },
        });

        return {
            success: true,
            client: response.data.client,
        };
    } catch (error) {
        console.error('Error creating client:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error al crear cliente',
        };
    }
}

//Create repair
export async function createRepairRequest(repairData, techToken) {
    try {
        const response = await api.post("/repairs", repairData, {
                headers: {
                    Authorization: `Bearer ${techToken}`,
                },
            }
        );

        return {
            success: true,
            repair: response.data
        };
    } catch (error) {
        console.error('Error creating repair:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error al crear reparación'
        };
    }
}


// Ger client repairs
export async function fetchClientRepairs(token) {
    try {
        const response = await api.get("/client/repairs", {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            success: true,
            repairs: response.data.repairs
        };
    } catch (error) {
        console.error('Error fetching repairs:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error al obtener reparaciones'
        };
    }
}

// Get tech repairs
export async function fetchTechnicianRepairs(token) {
    try {
        const response = await api.get("/technician/repairs", {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            success: true,
            repairs: response.data.repairs,
            count: response.data.count
        };
    } catch (error) {
        console.error('Error fetching repairs:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error al obtener reparaciones'
        };
    }
}

// Update state
export async function updateRepairStatus(repairId, status, token) {
    try {
        const response = await api.put(`/repairs/${repairId}/status`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            success: true,
            message: response.data.message
        };
    } catch (error) {
        console.error('Error updating repair status:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error al actualizar estado'
        };
    }
}

// Delete repair
export async function deleteRepair(repairId, token) {
    try {
        const response = await api.delete(`/repairs/${repairId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            success: true,
            message: response.data.message,
            deletedRepair: response.data.deleted_repair
        };
    } catch (error) {
        console.error('Error deleting repair:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error al eliminar reparación'
        };
    }
}

// Fetch recent repairs for technician dashboard
export async function fetchRecentRepairs(token) {
    try {
        const response = await api.get("/technician/repairs/recent", {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return {
            success: true,
            repairs: response.data.repairs
        };
    } catch (error) {
        console.error('Error fetching recent repairs:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error al obtener reparaciones recientes'
        };
    }
}

