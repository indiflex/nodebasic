import fs from 'fs';

// const rfile = './test.txt';
const rfile = new URL('test.txt', import.meta.url);
const wfile = new URL('testW.txt', import.meta.url);

const readStream = fs.createReadStream(rfile, {
	encoding: 'utf8',
	highWaterMark: 16,
});
const writeStream = fs.createWriteStream(wfile);

readStream.push('\n----------------\n');
readStream.on('data', chunk => {
	console.log('@rs.chunk>>', chunk);
	writeStream.write(chunk);
});

readStream.on('end', () => {
	console.log('end of RS');
	writeStream.close();
});

writeStream.on('close', () => {
	console.log('end of WS');
	console.log('LAST>>', fs.readFileSync(wfile, 'utf8'));
});
