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

describe('reading 1 chars file', () => {
  const buffer = ['a'];
  const file = new File(buffer, 'bla.txt');
  
  it('reading first line with should return "a"', async () => {
    const lr = new LineReader(file);
    const l = await lr.readLine();
    expect(l).toBe('a');
    expect(lr.hasNext()).toBeFalsy();
  });
});

describe('reading 2 lines file', () => {
  const buffer = ['a\nb'];
  const file = new File(buffer, 'bla.txt');
  
  it('should have exactly 2 lines "a" and "b"', async () => {
    const lr = new LineReader(file);
    expect(await lr.readLine()).toBe('a');
    expect(lr.hasNext()).toBe(true);
    expect(await lr.readLine()).toBe('b');
    expect(lr.hasNext()).toBeFalsy();
  });
});