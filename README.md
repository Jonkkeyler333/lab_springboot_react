# CRUD de productos: React + Spring Boot + MongoDB

Este proyecto contiene un frontend React con Vite y un backend Spring Boot que expone un CRUD de productos almacenados en MongoDB.

## Requisitos

- Java 21.
- Maven Wrapper incluido en `tallerSR/` (`mvnw.cmd` en Windows).
- Node.js y npm.
- MongoDB Atlas o una instalación local de MongoDB.

## Configuración de MongoDB

El backend lee la conexión desde la variable de entorno `MONGODB_URI`, configurada en `tallerSR/src/main/resources/application.properties`.

### Opción 1: MongoDB Atlas

1. Cree un cluster en MongoDB Atlas.
2. Cree una base de datos y un usuario.
3. Agregue su IP en la lista de acceso de red.
4. Copie la cadena de conexión y defina `MONGODB_URI`.

En PowerShell:

```powershell
$env:MONGODB_URI="mongodb+srv://usuario:contraseña@cluster.mongodb.net/tallerSR"
```

### Opción 2: MongoDB local

Inicie el servicio local de MongoDB y configure una cadena como:

```powershell
$env:MONGODB_URI="mongodb://localhost:27017/tallerSR"
```

La base de datos y la colección `products` pueden ser creadas automáticamente por MongoDB cuando se guarde el primer producto.

## Ejecución del backend

Abra una terminal en la raíz del repositorio y ejecute:

```powershell
cd tallerSR
.\mvnw.cmd spring-boot:run
```

La API estará disponible en `http://localhost:8080/api/products/`.

## Ejecución del frontend

En otra terminal, desde la raíz del repositorio:

```powershell
cd frontend
npm install
npm run dev
```

Abra la URL mostrada por Vite, normalmente `http://localhost:5173`.

Por defecto, el frontend consume el backend desde:

```text
http://localhost:8080/api/
```

Si necesita otra URL, cree un archivo `frontend/.env`:

```text
VITE_API_URL=http://localhost:8080/api/
```

## Funcionalidades

- Listar productos.
- Crear productos con validación de nombre, descripción, precio y stock.
- Editar productos existentes.
- Eliminar productos.
- Filtrar la lista por ID.
- Mostrar los errores de validación debajo del campo correspondiente.

## Scripts disponibles

```powershell
npm run dev
npm run build
npm run lint
npm run preview
```

El reporte técnico completo se encuentra en `reporte.tex`.
