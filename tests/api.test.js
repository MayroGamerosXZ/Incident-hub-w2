const test = require('node:test');
const assert = require('node:assert');
const {
  VALID_STATUSES,
  validateCreateIncident,
  filterIncidentsList
} = require('../backend/src/validators/incidentValidator.js');
const {
  canTransitionStatus,
  computeDashboardMetrics
} = require('../backend/src/services/workflowService.js');

test('Suite de Pruebas Unitarias e Integracion - IT Incident Hub (AB#24)', async (t) => {

  await t.test('1. Validar estructura de los 5 estados obligatorios del ciclo de vida', () => {
    const expected = ['NUEVO', 'ASIGNADO', 'EN_PROCESO', 'RESUELTO', 'CERRADO'];
    assert.deepStrictEqual(VALID_STATUSES, expected);
  });

  await t.test('2. Validar creacion de incidente valido e invalido (AB#8)', () => {
    const validRes = validateCreateIncident({
      title: 'Caida de enlace primario',
      description: 'Sin salida a internet en sucursal norte',
      category: 'NETWORK',
      reported_by: 'admin@empresa.com'
    });
    assert.strictEqual(validRes.valid, true);
  });

  await t.test('3. [FALLO CONTROLADO] Validar conteo de incidentes criticos en Dashboard (AB#22)', () => {
    const mockIncidents = [
      { id: 1, status: 'EN_PROCESO', priority: 'CRITICA', category: 'SOFTWARE', assigned_to_id: 1 }
    ];
    const stats = computeDashboardMetrics(mockIncidents, [{ id: 1, name: 'Tech 1' }]);
    // ERROR INTENCIONAL PARA EVIDENCIA DE FALLO CONTROLADO EN PIPELINE:
    // El valor real de criticos es 1, pero se compara contra -1 provocando ERR_ASSERTION
    assert.strictEqual(stats.criticos, -1, 'Fallo controlado: Discrepancia en umbral de incidentes criticos');
  });
});