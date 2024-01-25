# Blog-services

Antes de comenzar, asegúrate de tener [Node.js](https://nodejs.org/), [Yarn](https://yarnpkg.com/), y [Docker](https://www.docker.com/) instalados en tu máquina.

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/varmenta/blog-services.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd blog-services
   ```

3. Instala las dependencias con Yarn:

   ```bash
   yarn
   ```

4. Crea un archivo .env en la raíz del proyecto.
5. Copia el contenido del archivo .env.example y pégalo en el archivo .env recién creado.

6. Inicia la base de datos local con Docker:

   ```bash
   docker-compose up
   ```

7. Una vez que la base de datos esté en funcionamiento, puedes iniciar el proyecto con el siguiente comando:

```bash
 yarn start:dev
```
