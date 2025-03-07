# API-Gestor de ventas en línea

Este proyecto se centra en el desarrollo de una API web implementada en NodeJS, destinada a gestionar el registro de ventas, productos en línea y otras operaciones comerciales de una empresa. La aplicación se estructura en dos secciones principales, administrador y cliente, cada uno con funcionalidades específicas

## 📦 Instalación

1. Clona el repositorio:

```CMD
git clone https://github.com/DanielSacol010/Proyecto-Bimestral.git
```

2. Instalar las dependencias:

```CMD
npm i
```

3. Iniciar el servidor:

```CMD
npm run dev
```
---
## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```
*Este paso lo puedes saltar si quieres, ya cargue un archivo con variables de entorno personalizada*

## Credenciales del Admin por Defecto

Al iniciar la aplicación por primera vez, puede acceder al panel de administración utilizando las siguientes credenciales por defecto:

- **Usuario:** dsacol10
- **Email:** dsacol10@gmail.com
- **Contraseña:** Admin123*