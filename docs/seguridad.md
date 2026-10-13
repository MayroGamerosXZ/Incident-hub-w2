# ðŸ”’ PolÃ­tica de Seguridad, GestiÃ³n de Secretos y AuditorÃ­a de Dependencias (SCA)

**Responsable:** Andres Morales (SecOps & Quality Auditor) / Mayro Geovanni Barrios Gameros (DevOps Lead)  
**Trazabilidad:** `AB#25`, `AB#27`

---

## 1. GestiÃ³n de Secretos Protegidos (Cero Credenciales en Repositorio)

En estricto cumplimiento de las reglas de seguridad DevOps:
1. **ExclusiÃ³n en Control de Versiones:** El archivo `.gitignore` bloquea cualquier archivo `.env`, `.env.*`, certificados `*.pem` o tokens locales.
2. **ParametrizaciÃ³n en CÃ³digo:** El mÃ³dulo `backend/src/db.js` consume exclusivamente variables de entorno (`process.env.DB_HOST`, `process.env.DB_USER`, `process.env.DB_PASSWORD`, `process.env.DB_NAME`).
3. **Almacenamiento en Azure Pipelines (Library Variable Groups):**
   * Las credenciales de base de datos y tokens se inyectan mediante variables marcadas con candado (**Secret / Protected**) en Azure DevOps Pipelines (`DB_PASSWORD`, `PROD_API_TOKEN`), impidiendo su visualizaciÃ³n en logs de consola (se enmascaran como `***`).

---

## 2. AnÃ¡lisis de Dependencias y Vulnerabilidades (SCA - `npm audit`)

Se ejecutÃ³ el anÃ¡lisis automatizado de paquetes (`npm audit`) sobre los Ã¡rboles de dependencias de `backend/`, `frontend/` y `tests/`.

### Matriz de EvaluaciÃ³n de Paquetes y Decisiones Tomadas

| Paquete / LibrerÃ­a | UbicaciÃ³n | VersiÃ³n | Vulnerabilidades Detectadas | Severidad | DecisiÃ³n TÃ©cnica Tomada |
|---|---|---|---|---|---|
| `express` | `backend/` | `^4.19.2` | 0 vulnerabilidades | **Ninguna (0)** | **Mantener:** VersiÃ³n parcheada contra redirecciones abiertas (CVE-2024-29041 resuelto en 4.19.2). |
| `pg` | `backend/` | `^8.11.5` | 0 vulnerabilidades | **Ninguna (0)** | **Mantener:** Cliente PostgreSQL estable y mantenido activamente. |
| `cors` | `backend/` | `^2.8.5` | 0 vulnerabilidades | **Ninguna (0)** | **Mantener:** Sin dependencias transitivas riesgosas. |
| `dotenv` | `backend/` | `^16.4.5` | 0 vulnerabilidades | **Ninguna (0)** | **Mantener:** Cero dependencias externas. |
| `react` / `react-dom` | `frontend/` | `^18.3.1` | 0 vulnerabilidades | **Ninguna (0)** | **Mantener:** VersiÃ³n estable LTS de React 18. |
| `vite` | `frontend/` | `^5.2.11` | 0 en runtime (herramienta de compilaciÃ³n) | **Baja (Dev)** | **Aceptar / Aislar:** Vite solo se ejecuta en fase de empaquetado (`npm run build`), nunca se expone en el contenedor productivo. |
| `supertest` | `tests/` | `^6.3.4` | 0 en producciÃ³n (solo entorno QA) | **Baja (Dev)** | **Mitigar:** Se migrÃ³ la suite principal a `node:test` nativo de Node 18+ para reducir superficie de ataque en el agente de CI. |

---

## 3. VerificaciÃ³n Automatizada en Pipeline
Tanto en **GitHub Actions** (`.github/workflows/ci.yml`) como en **Azure Pipelines** (`azure-pipelines.yml`), el paso:
```bash
npm audit --audit-level=high
```
actÃºa como puerta de calidad (*Quality Gate*), bloqueando cualquier Pull Request que introduzca una dependencia con severidad **Alta** o **CrÃ­tica**.