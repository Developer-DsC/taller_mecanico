# CodeViz Research Context

> **Note**: This file contains research context from CodeViz. Most recent contexts are at the bottom.

---

## Research Query

muestrame todo el flujo

*Session: 05374a8794b0b7446bd43d8c3b4bd0e5 | Generated: 3/7/2025, 20:47:16*

### Analysis Summary

# Flujo General de la Aplicación

La aplicación se compone de dos partes principales: un **Backend** desarrollado con Node.js (Express) y un **Frontend** desarrollado con Angular. Ambos interactúan para proporcionar la funcionalidad completa del taller mecánico.

## Arquitectura de Alto Nivel

La aplicación sigue una arquitectura cliente-servidor. El **Frontend** ([ProyectoTW/](ProyectoTW/)) es una aplicación web que se ejecuta en el navegador del usuario y consume los servicios expuestos por el **Backend** ([Backend/](Backend/)). La comunicación entre ambos se realiza a través de peticiones HTTP (RESTful API).

### Flujo de Datos General

1.  El usuario interactúa con la interfaz de usuario del **Frontend**.
2.  El **Frontend** realiza peticiones HTTP al **Backend** para obtener o enviar datos.
3.  El **Backend** procesa las peticiones, interactúa con la base de datos y devuelve una respuesta al **Frontend**.
4.  El **Frontend** recibe la respuesta y actualiza la interfaz de usuario.

## Backend (Node.js/Express)

El **Backend** es responsable de la lógica de negocio, la gestión de la base de datos y la exposición de una API RESTful para el **Frontend**.

### Componentes Principales del Backend

*   **Punto de Entrada:** El servidor se inicia en [Backend/src/index.js](Backend/src/index.js), que a su vez importa y configura la aplicación Express desde [Backend/src/app.js](Backend/src/app.js).
*   **Configuración de Base de Datos:** La conexión a la base de datos se gestiona en [Backend/src/config/connectionDB.js](Backend/src/config/connectionDB.js) y [Backend/src/config/db.js](Backend/src/config/db.js).
*   **Aplicación Principal (Express):** [Backend/src/app.js](Backend/src/app.js) configura el middleware (como `express.json` para el parseo de JSON) y define las rutas de la API.
*   **Rutas (Routes):** Definen los endpoints de la API y mapean las peticiones HTTP a las funciones de los controladores. Un ejemplo es [Backend/src/routes/user.router.js](Backend/src/routes/user.router.js), que maneja las operaciones relacionadas con los usuarios.
*   **Controladores (Controllers):** Contienen la lógica de negocio para manejar las peticiones de cada ruta. Por ejemplo, [Backend/src/controllers/cliente.controller.js](Backend/src/controllers/cliente.controller.js) maneja las operaciones CRUD para los clientes, y [Backend/src/controllers/user.controller.js](Backend/src/controllers/user.controller.js) y [Backend/src/controllers/usuario.controller.js](Backend/src/controllers/usuario.controller.js) manejan la lógica de autenticación y gestión de usuarios.
*   **Modelos (Models):** Definen la estructura de los datos y la interacción con la base de datos. Ejemplos incluyen [Backend/src/models/cliente.model.js](Backend/src/models/cliente.model.js), [Backend/src/models/factura.model.js](Backend/src/models/factura.model.js), y [Backend/src/models/user.model.js](Backend/src/models/user.model.js).
*   **Middleware:** Funciones que se ejecutan antes de que las peticiones lleguen a los controladores. [Backend/src/middlewares/authMiddleware.js](Backend/src/middlewares/authMiddleware.js) es un ejemplo para la autenticación.

### Flujo de Petición en el Backend (Ejemplo: Obtener Clientes)

1.  Una petición HTTP (GET) llega a un endpoint como `/api/clientes`.
2.  La ruta definida en el router (ej. `cliente.router.js`) intercepta la petición.
3.  Si aplica, el middleware de autenticación ([Backend/src/middlewares/authMiddleware.js](Backend/src/middlewares/authMiddleware.js)) verifica el token del usuario.
4.  La petición es pasada al controlador correspondiente, por ejemplo, `cliente.controller.js`.
5.  La función del controlador ([Backend/src/controllers/cliente.controller.js](Backend/src/controllers/cliente.controller.js)) interactúa con el modelo de cliente ([Backend/src/models/cliente.model.js](Backend/src/models/cliente.model.js)) para consultar la base de datos.
6.  El modelo ejecuta la consulta a la base de datos.
7.  Los datos obtenidos son devueltos al controlador.
8.  El controlador formatea la respuesta y la envía de vuelta al **Frontend**.

## Frontend (Angular)

El **Frontend** es la interfaz de usuario de la aplicación, construida con Angular. Permite a los usuarios interactuar con el sistema y visualizar la información.

### Componentes Principales del Frontend

*   **Punto de Entrada:** La aplicación Angular se inicia en [ProyectoTW/src/main.ts](ProyectoTW/src/main.ts), que arranca el módulo raíz de la aplicación.
*   **Módulo Raíz:** [ProyectoTW/src/app/app.module.ts](ProyectoTW/src/app/app.module.ts) es el módulo principal que declara componentes, importa otros módulos y configura los proveedores de servicios.
*   **Componente Raíz:** [ProyectoTW/src/app/app.component.ts](ProyectoTW/src/app/app.component.ts) es el componente principal que define la estructura base de la aplicación, con su plantilla en [ProyectoTW/src/app/app.component.html](ProyectoTW/src/app/app.component.html).
*   **Enrutamiento (Routing):** [ProyectoTW/src/app/app-routing.module.ts](ProyectoTW/src/app/app-routing.module.ts) define las rutas de navegación de la aplicación, mapeando URLs a componentes específicos.
*   **Autenticación:** El módulo [ProyectoTW/src/app/auth/](ProyectoTW/src/app/auth/) maneja el inicio de sesión y el registro. El servicio [ProyectoTW/src/app/auth/auth.service.ts](ProyectoTW/src/app/auth/auth.service.ts) se encarga de la comunicación con el backend para la autenticación.
*   **Componentes de UI (Components):** El directorio [ProyectoTW/src/app/components/](ProyectoTW/src/app/components/) contiene componentes reutilizables de la interfaz de usuario, como [ProyectoTW/src/app/components/factura-form/factura-form.component.ts](ProyectoTW/src/app/components/factura-form/factura-form.component.ts) para la creación de facturas, y [ProyectoTW/src/app/components/shared/navbar/navbar.component.ts](ProyectoTW/src/app/components/shared/navbar/navbar.component.ts) para la barra de navegación.
*   **Páginas (Pages):** El directorio [ProyectoTW/src/app/pages/](ProyectoTW/src/app/pages/) contiene los componentes que representan vistas completas de la aplicación, como [ProyectoTW/src/app/pages/cliente/cliente.component.ts](ProyectoTW/src/app/pages/cliente/cliente.component.ts) para la gestión de clientes, o [ProyectoTW/src/app/pages/inventario/inventario.component.ts](ProyectoTW/src/app/pages/inventario/inventario.component.ts) para el inventario.
*   **Servicios (Services):** El directorio [ProyectoTW/src/app/services/](ProyectoTW/src/app/services/) contiene servicios que encapsulan la lógica para interactuar con el **Backend** API. Por ejemplo, [ProyectoTW/src/app/services/cliente.service.ts](ProyectoTW/src/app/services/cliente.service.ts) se encarga de las peticiones HTTP relacionadas con los clientes.
*   **Modelos/Interfaces:** Los directorios [ProyectoTW/src/app/models/](ProyectoTW/src/app/models/) y [ProyectoTW/src/app/interface/](ProyectoTW/src/app/interface/) definen las estructuras de datos (interfaces y clases) utilizadas en el frontend, como [ProyectoTW/src/app/models/factura.model.ts](ProyectoTW/src/app/models/factura.model.ts) o [ProyectoTW/src/app/interface/loginResponse.ts](ProyectoTW/src/app/interface/loginResponse.ts).

### Flujo de Interacción en el Frontend (Ejemplo: Mostrar Clientes)

1.  El usuario navega a la ruta `/clientes` en el navegador.
2.  El enrutador de Angular ([ProyectoTW/src/app/app-routing.module.ts](ProyectoTW/src/app/app-routing.module.ts)) carga el componente [ProyectoTW/src/app/pages/cliente/cliente.component.ts](ProyectoTW/src/app/pages/cliente/cliente.component.ts).
3.  Dentro del componente `ClienteComponent`, se inyecta el servicio [ProyectoTW/src/app/services/cliente.service.ts](ProyectoTW/src/app/services/cliente.service.ts).
4.  El `ClienteService` realiza una petición HTTP (GET) al endpoint `/api/clientes` del **Backend**.
5.  Una vez que el **Frontend** recibe la respuesta del **Backend** (una lista de clientes), el `ClienteService` la devuelve al `ClienteComponent`.
6.  El `ClienteComponent` actualiza su estado con los datos de los clientes.
7.  La plantilla HTML del componente ([ProyectoTW/src/app/pages/cliente/cliente.component.html](ProyectoTW/src/app/pages/cliente/cliente.component.html)) se renderiza, mostrando la lista de clientes al usuario.

