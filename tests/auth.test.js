const jwt = require('jsonwebtoken');

const SECRET = 'test_secret_key';

describe('JWT Token', () => {
  test('genera token con payload correcto', () => {
    const payload = { id: 1, email: 'admin@test.com', rol: 'ADMIN' };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('verifica token válido y extrae datos', () => {
    const payload = { id: 1, email: 'admin@test.com', rol: 'ADMIN' };
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    const decoded = jwt.verify(token, SECRET);
    expect(decoded.id).toBe(1);
    expect(decoded.email).toBe('admin@test.com');
    expect(decoded.rol).toBe('ADMIN');
  });

  test('rechaza token con firma inválida', () => {
    const token = jwt.sign({ id: 1 }, 'wrong_secret', { expiresIn: '1h' });
    expect(() => jwt.verify(token, SECRET)).toThrow();
  });

  test('rechaza token expirado', () => {
    const token = jwt.sign({ id: 1 }, SECRET, { expiresIn: '0s' });
    expect(() => jwt.verify(token, SECRET)).toThrow();
  });
});
