import stream from 'stream';

class MyReadable extends stream.Transform {
  constructor(options) {
    super(options)

    this.index = 0;
  }

  _read(size) {
    console.log('reading size', `${size}`);
    this.push(Buffer.from(String(++this.index)));
  }
}


class MyTransform extends stream.Transform {
  constructor(options) {
    super(options)
  }

  _transform(chunk, encoding, callback) {
    console.log('received', `${chunk}`);
    const transformedValue = `|${chunk}|`;
    console.log('transformed', transformedValue);
    this.push(transformedValue);
    // callback();  // ---------------------------------------------------------------< uncomment this to check the new behavior
  }
}

class MyWritable extends stream.Writable {
  constructor(options) {
    super(options)
  }

  _write(chunk, encoding, callback) { 
    console.log('write', `${chunk}`);
    callback();
  }
}

const done = (err) => console.log(`done`, err);

const myIncrementor = incrementor;

const myReadable = new MyReadable();
const myTransform = new MyTransform();
const myWritable = new MyWritable();

const pipeline = new stream.pipeline(myReadable, myTransform, myWritable, done);
