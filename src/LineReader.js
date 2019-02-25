import ChunkReader from './ChunkReader';

function LineReader(file) {
  const chunkReader = new ChunkReader(file);
  const lines = [];
  let lastChunk = '';
  Object.assign(this, {
    read: (n = 1) => {
      if (lines.length >= n) {
        return Promise.resolve(lines.splice(0, n)); 
      } else if (chunkReader.hasNext()) {
        return chunkReader.read().then(chunk => {
          chunk = lastChunk + chunk;
          const newLines = chunk.split('\n');
          lastChunk = newLines.pop();
          lines.push(...newLines);
          return this.read(n);
        });
      } else {
        if(lastChunk){
          lines.push(lastChunk);
          lastChunk = '';
        }

        return Promise.resolve(lines.splice(0,lines.length));
      }
    },

    hasNext: () => {
      return !!lastChunk || lines.length > 0 || chunkReader.hasNext();
    }
  });
}

export default LineReader;
