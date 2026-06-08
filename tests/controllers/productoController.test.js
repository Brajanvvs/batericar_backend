const { sanitize } = require('../../src/utils/sanitize');

describe('ProductoController (unitario)', () => {
  describe('sanitize de producto', () => {
    test('limpia campos vacíos de producto', () => {
      const body = {
        codigo: 'BAT-001',
        nombre: 'Batería',
        id_tipo: '',
        id_proveedor: '1',
        precio_venta: ''
      };
      const result = sanitize(body);
      expect(result.id_tipo).toBeNull();
      expect(result.id_proveedor).toBe('1');
      expect(result.precio_venta).toBeNull();
      expect(result.codigo).toBe('BAT-001');
    });
  });
});
