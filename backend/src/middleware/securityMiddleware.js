// Middleware de Seguridad y Sanitizacion de Payloads (Resolucion Deuda Tecnica DT-1 - AB#27)

function securityHeadersMiddleware(req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
}

function sanitizeInputString(value) {
  if (typeof value !== 'string') return value;
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

function sanitizePayload(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const cleaned = {};
  for (const [key, val] of Object.entries(obj)) {
    cleaned[key] = typeof val === 'string' ? sanitizeInputString(val) : val;
  }
  return cleaned;
}

module.exports = {
  securityHeadersMiddleware,
  sanitizeInputString,
  sanitizePayload
};