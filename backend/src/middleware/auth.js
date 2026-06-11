const jwt = require('jsonwebtoken');

// Middleware de autenticación unificado.
// Busca el token EXCLUSIVAMENTE en el header Authorization con formato "Bearer <token>".
module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization') || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // La identidad SIEMPRE proviene del JWT, nunca del body.
    req.user = { id: decoded.id };
    req.userId = decoded.id; // retrocompatibilidad con rutas existentes (users, missions, ...)

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'No autorizado' });
  }
};
