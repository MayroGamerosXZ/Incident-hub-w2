# ðŸš¨ Reporte de Fallo Controlado en Pipeline, DiagnÃ³stico y RecuperaciÃ³n

**Responsable del DiagnÃ³stico:** Mayro Geovanni Barrios Gameros (DevOps Lead) & Laura Torres (QA Tester)  
**Work Items Vinculados:** `AB#22`, `AB#24`

---

## 1. Contexto del Fallo Controlado
En cumplimiento de las condiciones obligatorias de DevOps (*"conservar evidencia de al menos un pipeline fallido, diagnÃ³stico, correcciÃ³n y ejecuciÃ³n exitosa"*), se registrÃ³ y documentÃ³ un incidente real de integraciÃ³n continua durante la validaciÃ³n de la **Semana 2**.

---

## 2. CronologÃ­a y DiagnÃ³stico del Incidente en CI

| Fase | Evento | Rama / PR | Resultado del Pipeline |
|---|---|---|---|
| **1. DetecciÃ³n** | EjecuciÃ³n del paso `Ejecutar Suite de Pruebas Automatizadas` tras el PR #4 | `feature/broken-test-simulation` (PR #4) | âŒ **FAILED (Exit Code 1)** |
| **2. DiagnÃ³stico** | InspecciÃ³n de bitÃ¡cora del runner: `AssertionError [ERR_ASSERTION]: Fallo controlado: Discrepancia en umbral de incidentes criticos (1 !== -1)` | Logs de CI | ðŸ” **Causa raÃ­z identificada** |
| **3. CorrecciÃ³n** | CreaciÃ³n de rama correctiva `fix/controlled-pipeline-failure` siguiendo el flujo oficial del equipo | `fix/controlled-pipeline-failure` (PR #5) | ðŸ› ï¸ **CÃ³digo corregido y revisado** |
| **4. VerificaciÃ³n** | Re-ejecuciÃ³n automÃ¡tica de la suite (6/6 pruebas unitarias y de seguridad aprobadas) | `main` (Post-Merge PR #5) | âœ… **SUCCEEDED (Verde)** |

---

## 3. Extracto del Log de Error Diagnosticado
```text
âœ– 3. [FALLO CONTROLADO] Validar conteo de incidentes criticos en Dashboard (AB#22)
  AssertionError [ERR_ASSERTION]: Fallo controlado: Discrepancia en umbral de incidentes criticos
  actual: 1
  expected: -1
  operator: 'strictEqual'
npm ERR! Test failed. See above for more details.
Error: Process completed with exit code 1.
```

---

## 4. SoluciÃ³n Aplicada (`fix/controlled-pipeline-failure`)
1. Se abriÃ³ la rama `fix/controlled-pipeline-failure` vinculada a `AB#22` y `AB#24`.
2. Se corrigiÃ³ la aserciÃ³n en `tests/api.test.js` validando que `stats.criticos === 1` y se aÃ±adiÃ³ la prueba #6 para verificar la sanitizaciÃ³n XSS de la deuda tÃ©cnica `DT-1`.
3. Se sometiÃ³ a Code Review en el **PR #5**, verificando que el pipeline regresÃ³ a estado **Verde (`Success`)**.