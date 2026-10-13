// Middleware Centralizado de Manejo de Errores HTTP (Resolucion Deuda Tecnica DT-2 - AB#15)

class AppError extends Error {
  constructor(message, statusCode = 400, details = []) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

function errorHandlerMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const response = {
    error: err.message || 'Error interno del servidor',
    status: statusCode,
    timestamp: new Date().toISOString(),
    path: req.originalUrl || req.url
  };
  if (err.details && err.details.length > 0) {
    response.details = err.details;
  }
  res.status(statusCode).json(response);
}

module.exports = {
  AppError,
  errorHandlerMiddleware
};