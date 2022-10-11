import { open } from 'fs/promises';

const hfile = new URL('test.txt', import.meta.url);
let fh;
try {
	fh = await open(hfile, 'a+');
	// console.log(await fh.stat());
	// await fh.writeFile('훈민정음\n');

	// const buf = Buffer.from('세종대왕123456');
	// console.log('buf>>', buf.length);
	// await fh.write(buf, 0, buf.length, 0);

	const { bytesRead, buffer: rbuf } = await fh.read({
		buffer: Buffer.alloc(33),
		// offset: 6,
		position: 3,
		// length: 9,
	});
	console.log('read>>', bytesRead, rbuf.toString());

	// console.log('read>>', await fh.readFile({ encoding: 'utf8' }));
	fh.truncate(9);
} catch (error) {
	console.error('ERROR>>', error);
} finally {
	fh?.close();
}
