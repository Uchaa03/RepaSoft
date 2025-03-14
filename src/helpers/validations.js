// Validations for forms
export function validateEmail(email) {
    if (!email) {
        return "Requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return "Formato Inválido";
    } else {
        return "";
    }
}

export function validatePasswordLogin(password) {
    if (!password) {
        return "Requerido";
    } else {
        return "";
    }
}

// Validations register
export function validateName(name) {
    if (!name) {
        return "Requerido";
    } else if (name.length < 3) {
        return "Min 3";
    } else {
        return "";
    }
}

export function validatePasswordRegister(password) {
    if (!password) {
        return "Requerido";
    }
    if (password.length < 8) {
        return "Mín. 8 caracteres";
    }
    if (password.length > 16) {
        return "Máx. 16 caracteres";
    }
    if (!/[A-Z]/.test(password)) {
        return "Mín. 1 mayúscula";
    }
    if (!/\d{2,}/.test(password)) {
        return "Mín. 2 números";
    }
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
        return "Mín. 1 especial";
    }
    return "";
}

export function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) {
        return "Requerido";
    } else if (password !== confirmPassword) {
        return "No Coinciden";
    } else {
        return "";
    }
}

export function validateMessage(message) {
    if (!message) {
        return "Requerido";
    } else if (message.length < 10) {
        return "Min. 10 caracteres.";
    } else {
        return "";
    }
}

export function validateDeviceName(deviceName) {
    if (!deviceName) {
        return "Requerido";
    } else if (deviceName.length < 3) {
        return "Mín. 3 caracteres";
    } else {
        return "";
    }
}

export function validateModel(model) {
    if (!model) {
        return "Requerido";
    } else if (model.length < 2) {
        return "Mín. 2 caracteres";
    } else {
        return "";
    }
}

export function validateType(type) {
    if (!type) {
        return "Requerido";
    } else {
        return "";
    }
}

export function validateDescription(description) {
    if (!description) {
        return "Requerido";
    } else if (description.length < 10) {
        return "Mín. 10 caracteres";
    } else if (description.length > 500) {
        return "Máx. 500 caracteres";
    } else {
        return "";
    }
}

export function validatePhone(phone) {
    if (!phone) {
        return "Requerido";
    } else if (!/^[+]?[\d\s-]{9}$/.test(phone)) {
        return "Formato inválido";
    }
    return "";
}

export function validateAddress(address) {
    if (!address) {
        return "Requerido";
    } else if (address.length < 10) {
        return "Mín. 10 caracteres";
    }
    return "";
}