export function ChunckReader(file) {
  const reader = new Reader(file);
  Object.assign(this, {
    read: (size) => reader.read(size),
    hasNext: () => reader.hasNext()
  });
}

class Reader {
  constructor(file) {
    this.fileReader = new FileReader();
    this.file = file;
    this.end = 0;
    this._currentResolve = null;

    this.fileReader.onload = () => {
      if (this._currentResolve){
        this._currentResolve(this.fileReader.result);
        this._currentResolve = null;
      } else {
        throw new Error('onload is called before promise resolved exist');
      }
    };
  }

  read(chunkSize = 1024 * 1024) {
    if (this._currentResolve) return null;
    if(this.end < this.file.size) {
      this.start = this.end;
      this.end += chunkSize;
      const prms = new Promise(resolve => {
        this._currentResolve = resolve;
      });
      let blob = this.file.slice(this.start, this.end);
      this.fileReader.readAsBinaryString(blob);
      return prms; 
    } else {
      return null;
    }
  }

  hasNext(){
    return this.end < this.file.size;
  }
}

export default ChunckReader;
