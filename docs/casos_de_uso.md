# Casos de Uso — ConnectONE

Funcionalidades actualmente operativas en el código.

---

## 1. Autenticación JWT de 30 días

**Descripción:** El sistema de autenticación permite registrar e iniciar sesión con correo y contraseña. La sesión se mantiene activa durante 30 días sin necesidad de volver a autenticarse.

**Flujo:**
1. Usuario completa el formulario en `AuthPage.jsx`.
2. El frontend llama a `POST /api/auth/register` (o `/login`).
3. El backend valida los datos con `authSchemas.js`, hashea la contraseña con bcrypt y devuelve un JWT.
4. El token se almacena en `localStorage` y se inyecta en cada petición vía el interceptor de `services/api.js`.
5. `AuthContext.jsx` expone `user` y `token` al árbol de componentes.

**Archivos clave:**
- `backend/src/routes/auth.js` — lógica de register/login/me
- `backend/src/middleware/auth.js` — verificación JWT
- `frontend/src/contexts/AuthContext.jsx`
- `frontend/src/pages/AuthPage.jsx`

---

## 2. Cuestionario de Onboarding

**Descripción:** Tras el primer registro, el usuario completa un cuestionario que personaliza su experiencia (objetivos, hábitos, nivel de actividad).

**Flujo:**
1. Después del login, si `user.questionnaire_completed === false`, el router redirige a `QuestionnairePage`.
2. El usuario responde el cuestionario y hace `POST /api/questionnaire/submit`.
3. El backend marca `questionnaire_completed: true` en el modelo `User` y guarda las respuestas en `Questionnaire`.
4. El frontend redirige al `DashboardPage`.

**Archivos clave:**
- `backend/src/routes/questionnaire.js`
- `backend/src/models/Questionnaire.js`
- `frontend/src/pages/QuestionnairePage.jsx`

---

## 3. Sistema de Misiones y Gamificación

**Descripción:** El núcleo del producto. El usuario recibe misiones diarias adaptadas a su nivel. Al completarlas gana XP, sube de nivel (16 niveles) y desbloquea skins del panda "Energiko".

**Flujo:**
1. `GET /api/missions/daily` devuelve las misiones del día para el usuario.
2. `POST /api/missions/:id/start` registra el inicio de una misión.
3. `POST /api/missions/:id/complete` otorga XP, actualiza `nivel` y `experiencia` en `User`, y evalúa logros.
4. `GET /api/missions/progress` devuelve el avance del usuario.
5. El frontend muestra el progreso en `MissionsWidget.jsx` y `ProgressWidget.jsx`.

**Archivos clave:**
- `backend/src/routes/missions.js`
- `backend/src/models/Mission.js`, `Progress.js`
- `frontend/src/pages/MissionsPage.jsx`, `MissionPage.jsx`
- `frontend/src/components/dashboard/MissionsWidget.jsx`

---

## 4. Temporizador Pomodoro / Deep Work

**Descripción:** El usuario puede activar sesiones de concentración cronometradas. Las sesiones se registran en el backend para estadísticas de productividad.

**Flujo:**
1. El widget `FocusModeWidget.jsx` muestra el temporizador en el dashboard.
2. Al finalizar una sesión, el frontend llama a `POST /api/pomodoro/session` con la duración.
3. `GET /api/pomodoro/stats` devuelve estadísticas acumuladas (tiempo total, sesiones, racha).

**Archivos clave:**
- `backend/src/routes/pomodoro.js`
- `frontend/src/components/dashboard/FocusModeWidget.jsx`

---

## 5. Generación de Retos con Inteligencia Artificial

**Descripción:** El sistema utiliza la API de Google Gemini para generar retos personalizados basados en el perfil del usuario (nivel, objetivos del cuestionario, hábitos).

**Flujo:**
1. El frontend solicita un reto al backend.
2. El backend construye un prompt con el contexto del usuario y lo envía a Gemini AI.
3. La respuesta se guarda en el modelo `Challenge` y se devuelve al frontend.

**Archivos clave:**
- `backend/src/services/api.js` — cliente de Gemini
- `backend/src/models/Challenge.js`

---

## 6. Registro de Hábitos y Racha

**Descripción:** Cada día que el usuario completa al menos una misión, su racha (`racha`) se incrementa. Si falta un día, la racha se reinicia. El historial de actividad se guarda en `Activity`.

**Flujo:**
1. Al completar una misión, el backend actualiza `racha` en `User`.
2. El dashboard muestra la racha actual en `ProgressWidget.jsx`.
3. `GET /api/stats/dashboard` agrega estadísticas completas para la vista principal.

**Archivos clave:**
- `backend/src/models/Activity.js`
- `backend/src/routes/stats.js`
- `frontend/src/components/dashboard/ProgressWidget.jsx`

---

## 7. Sistema de Logros

**Descripción:** 100+ logros desbloqueables por hitos (días de racha, niveles alcanzados, misiones completadas, etc.).

**Flujo:**
1. `GET /api/achievements` devuelve todos los logros con su estado (bloqueado/desbloqueado).
2. `POST /api/achievements/unlock` se llama desde la lógica de misiones cuando se cumple una condición.
3. `AchievementsPage.jsx` muestra la galería completa.

**Archivos clave:**
- `backend/src/routes/achievements.js`
- `frontend/src/pages/AchievementsPage.jsx`
- `frontend/src/config/achievements.js`

---

## 8. Perfil y Personalización del Panda

**Descripción:** Cada usuario tiene un panda "Energiko" que evoluciona con su nivel. Además puede equipar accesorios desbloqueados.

**Archivos clave:**
- `frontend/src/pages/ProfilePage.jsx`
- `frontend/src/components/profile/` (PandaCanvas, CustomizationPanel, InventoryPanel)
- `frontend/src/config/level-pandas.js`, `accessories.js`
