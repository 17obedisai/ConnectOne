# Arquitectura de ConnectONE

## Stack Tecnológico

| Capa | Tecnología | Versión | Rol |
|------|-----------|---------|-----|
| Frontend | React | 18.x | UI principal (SPA) |
| Build tool | Vite | 4.x | Empaquetado y dev server |
| Estilos | Tailwind CSS + CSS Modules | 3.x | Utilidades y animaciones nativas |
| Animaciones | Framer Motion | 10.x | Transiciones de UI complejas |
| Backend | Node.js + Express | 18.x / 4.x | API REST |
| Base de datos | MongoDB Atlas | (cloud) | Persistencia de datos |
| ODM | Mongoose | 7.x | Modelos y validaciones |
| Autenticación | JWT (jsonwebtoken) | 9.x | Sesiones sin estado, 30 días |
| IA | Google Gemini AI SDK | 0.x | Generación de retos personalizados |
| Seguridad | Helmet, express-rate-limit, express-mongo-sanitize | — | Hardening del servidor |

---

## Estructura de Carpetas

```
ConnectONE/
├── backend/
│   ├── config/
│   │   └── db.js               # Conexión a MongoDB Atlas
│   ├── src/
│   │   ├── middleware/
│   │   │   ├── auth.js          # Verificación JWT
│   │   │   └── validate.js      # Validación de body con Joi/Zod
│   │   ├── models/
│   │   │   ├── User.js          # Schema principal del usuario
│   │   │   ├── Mission.js       # Misiones disponibles
│   │   │   ├── Progress.js      # Progreso del usuario
│   │   │   ├── Activity.js      # Actividad y hábitos
│   │   │   ├── Challenge.js     # Retos generados por IA
│   │   │   ├── Questionnaire.js # Respuestas del cuestionario
│   │   │   └── Notification.js  # Notificaciones
│   │   ├── routes/
│   │   │   ├── auth.js          # /api/auth
│   │   │   ├── users.js         # /api/users
│   │   │   ├── missions.js      # /api/missions
│   │   │   ├── achievements.js  # /api/achievements
│   │   │   ├── pomodoro.js      # /api/pomodoro
│   │   │   ├── questionnaire.js # /api/questionnaire
│   │   │   ├── stats.js         # /api/stats
│   │   │   └── settings.js      # /api/settings
│   │   ├── services/
│   │   │   └── api.js           # Clientes externos (Gemini AI)
│   │   └── validators/
│   │       └── authSchemas.js   # Esquemas de validación de auth
│   └── server.js                # Entry point del backend
│
├── frontend/
│   ├── public/
│   │   └── images/              # Assets estáticos (pandas, UI)
│   ├── src/
│   │   ├── components/          # Componentes React reutilizables
│   │   │   ├── ui/              # Sistema de diseño base (shadcn/ui)
│   │   │   ├── dashboard/       # Widgets del dashboard
│   │   │   ├── missions/        # Componentes de misiones
│   │   │   └── profile/         # Secciones de perfil
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx  # Estado global de autenticación
│   │   │   └── DataContext.jsx  # Estado global de datos de la app
│   │   ├── pages/               # Páginas principales (rutas)
│   │   ├── services/
│   │   │   └── api.js           # Cliente HTTP centralizado (axios)
│   │   ├── config/              # Constantes (niveles, logros, accesorios)
│   │   ├── lib/                 # Utilidades puras
│   │   ├── index.css            # Estilos globales + @keyframes
│   │   └── main.jsx             # Entry point de React
│   ├── vite.config.js
│   └── dist/                    # Build de producción (se sube a Hostinger)
│
└── docs/                        # Documentación técnica
```

---

## Flujo de Comunicación

```
Usuario (Browser)
      │
      ▼
  React SPA  ←──── Vite build ──── dist/
      │
      │  HTTP + Bearer JWT
      ▼
  Express API  (backend/server.js)
      │
      ├── Middleware: Helmet, CORS, Rate Limit, Mongo Sanitize
      ├── Middleware: auth.js  (verifica JWT en cada ruta protegida)
      │
      ├── /api/auth          → routes/auth.js
      ├── /api/users         → routes/users.js
      ├── /api/missions      → routes/missions.js
      ├── /api/achievements  → routes/achievements.js
      ├── /api/pomodoro      → routes/pomodoro.js
      └── /api/questionnaire → routes/questionnaire.js
              │
              ▼
        MongoDB Atlas  (Mongoose ODM)
              │
              └── (retos IA) → Google Gemini API
```

### Flujo de autenticación
1. El usuario envía `POST /api/auth/register` o `POST /api/auth/login`.
2. El backend emite un **JWT de 30 días** firmado con `JWT_SECRET`.
3. El frontend almacena el token en `localStorage` y lo adjunta como `Authorization: Bearer <token>` en cada petición.
4. El middleware `auth.js` verifica la firma y extrae `req.user.id` en cada ruta protegida.
