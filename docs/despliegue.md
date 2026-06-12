# Manual de Despliegue — ConnectONE

---

## 1. Backend en Render

### Requisitos previos
- Cuenta en [render.com](https://render.com)
- Repositorio en GitHub conectado a Render
- Cluster de MongoDB Atlas con usuario y contraseña

### Pasos

1. **Crear un nuevo Web Service** en Render:
   - Runtime: `Node`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Branch: `main`

2. **Configurar Variables de Entorno** en el panel de Render (Environment → Add Environment Variable):

   | Variable | Descripción |
   |----------|-------------|
   | `MONGODB_URI` | URI de conexión a MongoDB Atlas (incluye usuario y contraseña) |
   | `JWT_SECRET` | Cadena aleatoria larga y segura para firmar tokens |
   | `FRONTEND_URL` | URL del frontend desplegado (ej. `https://connectone.space`) |
   | `GEMINI_API_KEY` | API Key de Google AI Studio para Gemini |
   | `NODE_ENV` | `production` |

   > **NUNCA** subas estos valores al repositorio. Solo al panel de Render.

3. **Verificar el health check**: Una vez desplegado, accede a `https://<tu-url>.onrender.com/`. Debe responder:
   ```json
   { "mensaje": "🚀 API de ConnectONE", "status": "Funcionando correctamente" }
   ```

4. **Nota sobre cold starts**: El plan gratuito de Render duerme el servidor tras 15 minutos de inactividad. La primera petición puede tardar ~30 s en arrancar. Considera el plan Starter ($7/mes) para producción real.

---

## 2. Frontend en Hostinger / Apache

### Requisitos previos
- Acceso a panel de control de Hostinger (hPanel)
- Acceso FTP o File Manager
- Dominio configurado (ej. `connectone.space`)

### Pasos

1. **Generar el build de producción** (en tu máquina local):
   ```bash
   cd frontend
   npm install
   npm run build
   ```
   Esto genera la carpeta `frontend/dist/`.

2. **Configurar la URL de la API** antes del build. Crea o edita `frontend/.env`:
   ```
   VITE_API_URL=https://<tu-backend>.onrender.com/api
   ```

3. **Subir el contenido de `dist/` a Hostinger**:
   - Accede al File Manager de hPanel.
   - Navega a `public_html/` (o la carpeta raíz del dominio).
   - Sube **todo el contenido** de `dist/` (no la carpeta en sí, sino su contenido).

4. **Crear el archivo `.htaccess`** en `public_html/` para que el routing de React funcione correctamente con Apache:

   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^ index.html [QSA,L]
   ```

   > Sin este archivo, al recargar cualquier ruta que no sea `/` recibirás un 404 de Apache.

5. **Verificar**: Accede a tu dominio y prueba navegar a una ruta como `/login` y recarga la página. Debe cargar correctamente.

---

## 3. Configuración de CORS

El backend solo acepta peticiones desde el `FRONTEND_URL` definido en las variables de entorno (`server.js` línea 38). Asegúrate de que este valor coincida exactamente con el dominio del frontend, incluyendo el protocolo (`https://`).

---

## 4. Actualizar el backend (re-deploy)

En Render, cada `git push` a la rama configurada dispara automáticamente un nuevo deploy. No se requiere intervención manual.

## 5. Actualizar el frontend

Cada vez que modifiques el frontend:
```bash
cd frontend
npm run build
```
Luego sube el contenido nuevo de `dist/` a Hostinger (reemplazando los archivos anteriores).
