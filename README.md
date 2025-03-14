# RepaSoft - Sistema de Gestión de Reparaciones

![LogoLight.svg](public%2Fimg%2FLogoLight.svg)

## 📋 Descripción del Proyecto

RepaSoft es una aplicación web completa diseñada para gestionar el proceso de reparación de dispositivos electrónicos. 
La plataforma conecta técnicos y clientes, facilitando el seguimiento de reparaciones desde su creación hasta su finalización.
Y aportando una mejor experencia del usuario podiendo ver las reparaciones desde su casa.

### ✨ Características Principales

#### Para Técnicos:
- **Panel de Control Intuitivo**: Visualización rápida de reparaciones recientes y acceso a todas las funcionalidades, 
algunas de ellas están pendiente de desarrollar si decido hacer propuesta de ampliar TFG.
- **Gestión de Reparaciones**: Crear, actualizar estado, ver detalles y eliminar reparaciones
- **Gestión de Clientes**: Buscar clientes existentes o registrar nuevos clientes, en la creación de la reparación
- **Vista de Reparaciones Completa**: Acceso a todas las reparaciones de todas las reparaciones realizadas

#### Para Clientes:
- **Seguimiento de Reparaciones**: Visualización del estado actual de sus dispositivos en reparación
- **Perfil de Usuario**: Gestión de cambio de contraseña en el primer inicio de sesión

### 🛠️ Tecnologías Utilizadas
- **Frontend**: Vue.js 3, Vite, SASS
- **Backend**: Laravel 12, PHP 8.4
- **Base de Datos**: MySQL
- **Autenticación**: JWT
- **Despliegue**: **Railway**(Back)  y **Netlify**(Front)

## 🚀 Instalación y Configuración

### Requisitos Previos
- PHP 8.4 o superior
- Composer
- Node.js 16 o superior
- NPM o Yarn
- MySQL

### Instalación del Backend
Para utilizar el backend solo hay que utilizar la ruta proporcionada en el `.env`
````dotenv
VITE_API_BASE_URL=https://rutabackend/api
````

### Instalación del Frontend
1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   # Editar .env con la URL de la API
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 📱 Uso de la Aplicación

### Para Técnicos

1. **Iniciar Sesión**: Accede como técnico con tus credenciales
2. **Panel de Control**: Visualiza reparaciones recientes y accede a todas las funcionalidades
3. **Crear Reparación**:
    - Busca un cliente existente por email o crea uno nuevo
    - Completa los datos del dispositivo (nombre, modelo, tipo, descripción)
    - Envía el formulario para registrar la reparación
4. **Gestionar Reparaciones**:
    - Actualiza el estado (pendiente, en progreso, completada, cancelada)
    - Visualiza detalles completos de cada reparación
    - Elimina reparaciones si es necesario

### Para Clientes

1. **Iniciar Sesión**: Accede como cliente con tus credenciales
2. **Dashboard**: Visualiza tus reparaciones actuales y su estado
3. **Ver Historial**: Accede al historial completo de tus reparaciones
4. **Gestiona tu Perfil**: Actualiza tu contraseña en el primer inicio de sesión, la contra le llega al cliente por
correo.

## 🌐 Despliegue Público

La aplicación está desplegada y disponible en:

- **URL Principal**: [https://repasoft12.up.railway.app](https://repasoft12.up.railway.app)
- **API Endpoint**: [https://repasoft12.up.railway.app/api](https://repasoft12.up.railway.app/api)

### Credenciales de Prueba

Para explorar la aplicación, puedes utilizar las siguientes credenciales:

**Técnico:**
- Email: tecnico.repasoft@gmail.com
- Contraseña: @Repasoft2003

**Cliente:**
- Email: uchasousaa@gmail.com
- Contraseña: @Cliente2003

## ❤️ Conclusión

Ha sido un proyecto duro y a pesar de no estar 100% refinado sobre todo por la documentación y el responsive que no me dio 
tiempo en cuanto a funcionalidad y diseño creo que esta bastante bien y guay y que he aprendido a manejar más o menos bien 
Vue con SASS, también consciente de que la aplicación puede tener un montón de más implementaciones y mejoras y la 
considero muy explotable la verdad. Contento con el esfuerzo y resultado obtenidos.

---

Desarrollado con ❤️ por el Adrián Ucha Sousa © 2025