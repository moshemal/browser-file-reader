import ChunkReader from './ChunkReader';

describe('Importing the lib', () => {
  test('should return a function', () => {
    expect(typeof ChunkReader).toBe('function');
  });
});

describe('Instance creation', () => {
  const methods = ['read', 'hasNext'];
  const cr = new ChunkReader();
  test.each(methods)('should have %s method', (name) => {
    expect(typeof cr[name]).toBe('function');
  });
});

describe('reading 3 chars file', () => {
  const buffer = ['abc'];
  const file = new File(buffer, 'bla.txt');
  it('reading first chunk with size 1 should return "a"', async () => {
    const cr = new ChunkReader(file);
    const firstChunk = await cr.read(1); 
    expect(firstChunk).toBe('a');
    expect(cr.hasNext()).toBe(true);
  });
  it('reading first chunk with default size should return "abc"', async () => {
    const cr = new ChunkReader(file);
    const firstChunk = await cr.read(); 
    expect(firstChunk).toBe('abc');
    expect(cr.hasNext()).toBe(false);
  });
  it('reading second and third chunk with default size should return null', async () => {
    const cr = new ChunkReader(file);
    const prms = cr.read(); 
    expect(await cr.read()).toBe(null);
    await prms;
    expect(await cr.read()).toBe(null);
  });
});