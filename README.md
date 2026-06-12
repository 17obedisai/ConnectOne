# ConnectONE 🐼

**Gamifica tu bienestar. Desbloquea tu potencial.**

ConnectONE es una plataforma de desarrollo personal que convierte tus hábitos diarios en una aventura épica. Con misiones, niveles, un panda mascota que evoluciona contigo, y retos generados por Inteligencia Artificial, hace que mantener hábitos saludables sea divertido y sostenible.

---

## Requisitos Previos

- Node.js `>= 18`
- npm `>= 9`
- Cuenta en MongoDB Atlas (o instancia local de MongoDB)
- API Key de Google AI Studio (Gemini)

---

## Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd ConnectONE
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crea el archivo `.env` en `backend/` con las variables de entorno (ver tabla más abajo):

```bash
cp .env.example .env   # si existe el ejemplo, o créalo manualmente
```

Inicia el servidor:

```bash
node server.js
# o en modo desarrollo con recarga automática:
npx nodemon server.js
```

El backend quedará disponible en `http://localhost:5000`.

### 3. Configurar el Frontend

```bash
cd ../frontend
npm install
```

Crea el archivo `.env` en `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

El frontend quedará disponible en `http://localhost:5173`.

---

## Variables de Entorno

### Backend (`backend/.env`)

| Variable | Descripción |
|----------|-------------|
| `MONGODB_URI` | URI de conexión a MongoDB Atlas |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT |
| `FRONTEND_URL` | URL del frontend (para CORS) |
| `GEMINI_API_KEY` | API Key de Google Gemini AI |
| `PORT` | Puerto del servidor (por defecto: 5000) |
| `NODE_ENV` | `development` o `production` |

### Frontend (`frontend/.env`)

| Variable | Descripción |
|----------|-------------|
| `VITE_API_URL` | URL base de la API del backend |

> **Seguridad:** Nunca subas archivos `.env` al repositorio. Están incluidos en `.gitignore`.

---

## Build de Producción

```bash
cd frontend
npm run build
# El resultado queda en frontend/dist/
```

---

## Documentación Técnica

Toda la documentación detallada está en la carpeta [`docs/`](./docs/):

- [`docs/arquitectura.md`](./docs/arquitectura.md) — Stack, estructura de carpetas y flujo de comunicación
- [`docs/casos_de_uso.md`](./docs/casos_de_uso.md) — Funcionalidades implementadas
- [`docs/despliegue.md`](./docs/despliegue.md) — Guía de despliegue en Render + Hostinger
- [`docs/api_endpoints.md`](./docs/api_endpoints.md) — Referencia de la API REST

---

## Desarrollado por

**Obed Rodriguez** — Full Stack Developer  
obedisairodriguezome12@gmail.com  
Garzón, Huila — Colombia

---

*ConnectONE — Producto independiente. Acceso gratuito por lanzamiento.*
