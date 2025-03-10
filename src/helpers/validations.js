// Validations for forms
export function validateEmail(email) {
    if (!email) {
        return "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "El correo electrónico no es válido.";
    } else {
        return "";
    }
}

export function validatePassword(password) {
    if (!password) {
        return "La contraseña es obligatoria.";
    } else {
        return "";
    }
}