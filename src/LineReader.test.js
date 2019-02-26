import LineReader from './LineReader';

describe('Importing the lib', () => {
  test('should return a function', () => {
    expect(typeof LineReader).toBe('function');
  });
});

describe('Instance creation', () => {
  const methods = ['read', 'readLine', 'hasNext'];
  const lr = new LineReader();
  test.each(methods)('should have %s method', (name) => {
    expect(typeof lr[name]).toBe('function');
  });
});