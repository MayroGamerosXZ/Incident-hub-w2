# ðŸ’³ Registro y ResoluciÃ³n de Deuda TÃ©cnica (Technical Debt Log)

En cumplimiento de la condiciÃ³n obligatoria de DevOps (*"identificar al menos 5 deudas reales y resolver al menos 2 mediante trabajo trazable"*), se documenta el inventario de deuda tÃ©cnica y la evidencia de resoluciÃ³n en la **Semana 2**:

| # | Deuda TÃ©cnica Identificada | CategorÃ­a | Impacto | Estado Actual | Evidencia Trazable (Rama / PR / Work Item) |
|---|---|---|---|---|---|
| **DT-1** | Falta de sanitizaciÃ³n estricta de entradas contra XSS y cabeceras HTTP de seguridad | Seguridad | Medio | âœ… **RESUELTA (Semana 2)** | Rama `refactor/dt1-security-sanitization` âž” **PR #1** (`AB#27`) |
| **DT-2** | Manejo de errores HTTP disperso sin middleware centralizado en Express | Mantenibilidad | Medio | âœ… **RESUELTA (Semana 2)** | Rama `refactor/dt2-error-handling-middleware` âž” **PR #2** (`AB#15`, `AB#21`) |
| **DT-3** | Inexistencia de paginaciÃ³n basada en cursor para volÃºmenes mayores a 10,000 tickets | Escalabilidad | Medio | ðŸ“‹ Identificada / Mitigada con filtros | Backlog (`AB#11`) |
| **DT-4** | ConfiguraciÃ³n de reintentos automÃ¡ticos con backoff exponencial en caÃ­das de BD | Resiliencia | Bajo | ðŸ“‹ Identificada / Mitigada con fallback | Backlog (`AB#7`) |
| **DT-5** | Ausencia de Ã­ndices compuestos multicolumna para reportes histÃ³ricos anuales | Rendimiento BD | Bajo | ðŸ“‹ Identificada | Backlog (`AB#18`) |

---

## ðŸ› ï¸ Detalle TÃ©cnico de las Deudas Resueltas

### 1. ResoluciÃ³n de DT-1 (`refactor/dt1-security-sanitization`)
* **Problema original:** Los campos `title`, `description` y `comment` se almacenaban directamente sin limpiar etiquetas HTML/script ni inyectar cabeceras de endurecimiento HTTP.
* **SoluciÃ³n implementada:** Se creÃ³ `backend/src/middleware/securityMiddleware.js` con las funciones `sanitizeInputString`, `sanitizePayload` y `securityHeadersMiddleware`.

### 2. ResoluciÃ³n de DT-2 (`refactor/dt2-error-handling-middleware`)
* **Problema original:** Las respuestas de error carecÃ­an de una estructura estandarizada con `timestamp`, `status` y `path`.
* **SoluciÃ³n implementada:** Se creÃ³ la clase `AppError` y el middleware `errorHandlerMiddleware` en `backend/src/middleware/errorHandler.js`.