const { sanitize } = require('../src/utils/sanitize');

describe('sanitize()', () => {
  test('convierte string vacío a null en campos numéricos', () => {
    const input = { id_tipo: '', nombre: 'Test', precio_venta: '' };
    const result = sanitize(input);
    expect(result.id_tipo).toBeNull();
    expect(result.nombre).toBe('Test');
    expect(result.precio_venta).toBeNull();
  });

  test('no modifica valores numéricos válidos', () => {
    const input = { id_tipo: 1, precio_venta: 25000 };
    const result = sanitize(input);
    expect(result.id_tipo).toBe(1);
    expect(result.precio_venta).toBe(25000);
  });

  test('no modifica campos no numéricos', () => {
    const input = { nombre: '', email: 'test@test.com' };
    const result = sanitize(input);
    expect(result.nombre).toBe('');
    expect(result.email).toBe('test@test.com');
  });

  test('no muta el objeto original', () => {
    const input = { id_tipo: '', nombre: 'test' };
    const copy = { ...input };
    sanitize(input);
    expect(input).toEqual(copy);
  });
});
