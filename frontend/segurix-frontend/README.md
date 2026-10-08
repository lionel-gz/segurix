# Segurix

**Gestor de gastos personales desarrollado con React, Spring Boot y MySQL.**

Segurix permite registrar, consultar, modificar y eliminar gastos personales, aplicar filtros y búsquedas, consultar informes y administrar categorías, medios de pago y preferencias de visualización.

El proyecto está desarrollado con una arquitectura separada entre **frontend y backend**, comunicados mediante una **API REST**, utilizando **MySQL** como sistema de persistencia.

---

## Características

### Gestión de gastos

* Registrar gastos.
* Consultar gastos.
* Modificar gastos.
* Eliminar gastos.
* Buscar por descripción.
* Filtrar por categoría.
* Filtrar por medio de pago.
* Filtrar por rango de fechas.
* Filtrar por rango de montos.
* Visualizar el total de gastos.

### Informes

* Consultar resúmenes de gastos.
* Consultar información agrupada por períodos.
* Consultar información según categorías y medios de pago.

### Configuración

* Consultar categorías.
* Crear nuevas categorías.
* Consultar medios de pago.
* Crear nuevos medios de pago.
* Configurar preferencias de visualización.

### Experiencia de usuario

* Estados de carga.
* Manejo de errores.
* Notificaciones mediante Toast.
* Confirmación antes de eliminar gastos.
* Estados vacíos.
* Validaciones de formularios.
* Mejoras básicas de accesibilidad.

---

## Tecnologías

### Frontend

| Tecnología   | Versión / uso |
| ------------ | ------------- |
| React        | 19.2.8        |
| Vite         | 8.3.1         |
| React Router | 7.18.4        |
| Lucide React | Iconografía   |
| JavaScript   | Lenguaje      |
| HTML         | Estructura    |
| CSS          | Estilos       |

### Backend

| Tecnología        | Versión / uso        |
| ----------------- | -------------------- |
| Java              | 21                   |
| Spring Boot       | 4.1.1                |
| Spring Data JPA   | Persistencia         |
| Hibernate         | ORM                  |
| Maven             | Gestión del proyecto |
| MySQL Connector/J | Conexión con MySQL   |

### Base de datos

* MySQL 9.3

---

## Arquitectura

Segurix utiliza una arquitectura de tres capas principales:

```text
┌──────────────────────────┐
│        FRONTEND          │
│      React + Vite        │
└────────────┬─────────────┘
             │
             │ HTTP / REST
             ▼
┌──────────────────────────┐
│         BACKEND          │
│ Java + Spring Boot       │
│ Controllers / Services   │
│ Repositories / JPA       │
└────────────┬─────────────┘
             │
             │ JPA / Hibernate
             ▼
┌──────────────────────────┐
│       BASE DE DATOS      │
│          MySQL           │
└──────────────────────────┘
```

El frontend consume los endpoints REST expuestos por Spring Boot.

El backend concentra la lógica de negocio, validaciones y acceso a datos mediante **Spring Data JPA e Hibernate**.

---

## Estructura del proyecto

```text
Segurix/
│
├── backend/
│   └── segurix-backend/
│       ├── src/
│       ├── pom.xml
│       └── mvnw
│
├── frontend/
│   └── segurix-frontend/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── vite.config.js
│
├── database/
│   ├── 01_creacion_bd.sql
│   ├── 02_datos_iniciales.sql
│   └── 03_datos_prueba.sql
│
├── .gitignore
└── README.md
```

---

## Requisitos

Para ejecutar el proyecto se necesita:

* Java 21
* Node.js y npm
* MySQL 9.3 o compatible
* Git

---

## Base de datos

Los scripts SQL se encuentran en:

```text
database/
├── 01_creacion_bd.sql
├── 02_datos_iniciales.sql
└── 03_datos_prueba.sql
```

### Inicialización

Primero ejecutar:

```text
database/01_creacion_bd.sql
```

Luego:

```text
database/02_datos_iniciales.sql
```

El archivo `03_datos_prueba.sql` contiene consultas utilizadas para comprobar la información almacenada en la base de datos.

---

## Configuración del backend

El backend utiliza **variables de entorno** para configurar la conexión con MySQL.

Definir las siguientes variables antes de ejecutar la aplicación:

```text
DB_URL=jdbc:mysql://localhost:3306/segurix
DB_USERNAME=root
DB_PASSWORD=TU_CONTRASEÑA
```

Las credenciales reales se mantienen fuera del repositorio y no deben almacenarse en el código fuente.

---

## Ejecución

### Backend

Desde la carpeta del backend:

```bash
cd backend/segurix-backend
```

En Git Bash:

```bash
./mvnw spring-boot:run
```

En Windows:

```cmd
mvnw.cmd spring-boot:run
```

Por defecto, el backend se ejecuta en:

```text
http://localhost:8080
```

### Frontend

Desde otra terminal:

```bash
cd frontend/segurix-frontend
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Por defecto, Vite proporciona la aplicación en:

```text
http://localhost:5173
```

---

## Calidad y buenas prácticas

Durante el desarrollo se aplicaron diferentes prácticas orientadas a mantener el proyecto organizado, mantenible y seguro:

* Validaciones mediante Jakarta Bean Validation.
* Restricciones a nivel de entidad y base de datos.
* Uso de `BigDecimal` para representar montos monetarios.
* Validación de categorías y medios de pago existentes.
* Restricciones de nombres únicos.
* Manejo de errores HTTP.
* Uso de `@Valid` para validar datos recibidos.
* Inyección de dependencias mediante constructores.
* Separación de responsabilidades entre Controllers, Services y Repositories.
* Uso de Specifications para filtros dinámicos.
* Variables de entorno para credenciales de base de datos.
* Exclusión de archivos generados y sensibles mediante `.gitignore`.
* CORS limitado al frontend utilizado durante el desarrollo.
* Mejoras básicas de accesibilidad.
* Historial Git limpiado para evitar conservar credenciales expuestas anteriormente.

> Segurix V1.0 no implementa autenticación ni autorización. El sistema está planteado inicialmente para un único usuario final.

---

## Comandos útiles

### Frontend

Ejecutar ESLint:

```bash
npm run lint
```

Generar una compilación de producción:

```bash
npm run build
```

Previsualizar la compilación:

```bash
npm run preview
```

---

## Estado del proyecto

### V1.0 — Completada

La primera versión funcional incluye:

* Gestión completa de gastos.
* Categorías.
* Medios de pago.
* Filtros y búsquedas.
* Informes.
* Preferencias de visualización.
* Validaciones.
* Manejo de errores.
* Confirmaciones de eliminación.
* Estados de carga.
* Mejoras básicas de accesibilidad.
* Configuración mediante variables de entorno.
* Repositorio Git organizado.

La interfaz de V1.0 está orientada principalmente a escritorio.

---

## Roadmap

Funcionalidades consideradas para futuras versiones:

* Autenticación de usuarios.
* Gestión de múltiples usuarios.
* Roles y permisos.
* Gráficos y visualizaciones.
* Presupuestos.
* Gastos recurrentes.
* Alertas.
* Calendario de gastos.
* Diseño responsive para dispositivos móviles.
* Dockerización.
* Despliegue del sistema.

Estas funcionalidades no forman parte de Segurix V1.0.

---

## Autor

**Lionel Gutierrez**

Proyecto desarrollado como práctica y portfolio personal para profundizar conocimientos en desarrollo de software, arquitectura backend, desarrollo frontend, persistencia de datos y buenas prácticas.

---

**Segurix — V1.0.0**
