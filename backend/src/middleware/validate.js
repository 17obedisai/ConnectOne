// Middleware genérico de validación con Zod.
// Garantiza que ningún endpoint procese diccionarios crudos: si la validación
// pasa, reemplaza req.body con los datos ya parseados y saneados por el esquema.
module.exports = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: 'Datos inválidos',
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      }))
    });
  }

  // Solo datos validados y normalizados llegan a la lógica de negocio.
  req.body = result.data;
  next();
};
