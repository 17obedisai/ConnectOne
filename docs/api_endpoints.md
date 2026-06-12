# API Endpoints — ConnectONE

Base URL: `https://<tu-backend>.onrender.com/api`

Todas las rutas marcadas con 🔒 requieren el header:
```
Authorization: Bearer <JWT>
```

---

## Auth — `/api/auth`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Registra un nuevo usuario |
| POST | `/auth/login` | No | Inicia sesión y devuelve JWT |
| GET | `/auth/me` | 🔒 | Devuelve el usuario autenticado |

### POST `/auth/register`
```json
{
  "nombre": "string (mínimo 2 chars)",
  "email": "string (email válido)",
  "password": "string (mínimo 6 chars)"
}
```
**Respuesta 201:**
```json
{
  "success": true,
  "token": "<JWT 30 días>",
  "data": { "user": { "id", "nombre", "email", "nivel", "experiencia", "racha", "questionnaire_completed" } }
}
```

### POST `/auth/login`
```json
{
  "email": "string",
  "password": "string"
}
```
**Respuesta 200:** igual que register.

---

## Usuarios — `/api/users`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/users/profile` | 🔒 | Devuelve el perfil completo del usuario |
| POST | `/users/initial-profile` | 🔒 | Configura perfil inicial post-onboarding |
| PUT | `/users/level-up` | 🔒 | Aplica subida de nivel |

---

## Cuestionario — `/api/questionnaire`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/questionnaire/submit` | 🔒 | Guarda respuestas del onboarding |
| GET | `/questionnaire/my-questionnaire` | 🔒 | Devuelve las respuestas del usuario |

### POST `/questionnaire/submit`
```json
{
  "respuestas": { /* objeto con las respuestas del cuestionario */ }
}
```

---

## Misiones — `/api/missions`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/missions/` | 🔒 | Lista todas las misiones disponibles |
| GET | `/missions/daily` | 🔒 | Misiones del día para el usuario |
| GET | `/missions/progress` | 🔒 | Progreso actual del usuario en misiones |
| POST | `/missions/:misionId/start` | 🔒 | Inicia una misión |
| POST | `/missions/:misionId/complete` | 🔒 | Completa una misión (otorga XP) |

---

## Logros — `/api/achievements`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/achievements/` | 🔒 | Lista todos los logros con estado |
| POST | `/achievements/unlock` | 🔒 | Desbloquea un logro específico |

### POST `/achievements/unlock`
```json
{
  "achievementId": "string"
}
```

---

## Pomodoro / Deep Work — `/api/pomodoro`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/pomodoro/session` | 🔒 | Registra una sesión de foco completada |
| GET | `/pomodoro/stats` | 🔒 | Devuelve estadísticas acumuladas de foco |

### POST `/pomodoro/session`
```json
{
  "duracion": 25,
  "tipo": "pomodoro"
}
```

---

## Estadísticas — `/api/stats`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/stats/dashboard` | 🔒 | Agrega todas las métricas del dashboard |

---

## Códigos de Error Comunes

| Código | Significado |
|--------|-------------|
| 400 | Datos de entrada inválidos o usuario ya existe |
| 401 | Token ausente o inválido |
| 404 | Recurso no encontrado |
| 429 | Rate limit alcanzado (100 req / 15 min por IP) |
| 500 | Error interno del servidor |
