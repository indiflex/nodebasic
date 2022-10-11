// import { readFile, readFileSync } from 'fs';
import path from 'path';
import fs from 'fs';

// await fs.promises.readFile();

// const hfile = path.json(__dirnmame, 'package.json');
// const hfile = new URL('package.json', import.meta.url);
const hfile = new URL('test.txt', import.meta.url);
const usePromise = true;

if (usePromise) {
	const {
		readFile,
		writeFile,
		appendFile,
		mkdir,
		rm,
		readdir,
		rmdir,
		readlink,
	} = fs.promises;
	// await writeFile(hfile, '세종대왕\n');
	// await appendFile(hfile, '세종대왕\n');
	// const data = await readFile(hfile, { encoding: 'utf8', flag: 'r' });
	// console.log('data>>', data);

	try {
		const projectFolder = new URL('./test/project/', import.meta.url);
		const testFolder = new URL('./test/', import.meta.url);
		const createDir = await mkdir(projectFolder, { recursive: true });
		const linkFile = new URL('./lntest', import.meta.url);

		// await rmdir(testFolder);
		// rm(testFolder, { recursive: true, force: true });

		// const files = await readdir('.');
		// console.log('files>>', files);
		// const files = await readdir('.', { withFileTypes: true });
		// for (const file of files) console.log('f=', file.name, file.isDirectory());

		console.log('ln>>>', await readFile(linkFile, 'utf8'));

		const sss = await readlink('./lntest');
		console.log('sss>>', sss);
	} catch (err) {
		console.error('ERR>>', err);
	}
	// rm('./test', { recursive: true, force: true }); // rmdir's recursive is deprecated!!
} else {
	const { readFile } = fs;
	readFile(hfile, 'utf8', (err, data) => {
		if (err) throw err;
		// console.log('buff>>>', data, data.length, data.byteLength);
		// console.log('data>>', data.toString(), data instanceof Buffer);
		console.log('data>>', data);
	});

	// import util from 'util';
	// const data = await util.promisify(readFile)('./package.json');
	// console.log(';;>>', data.toString('utf8'));

	// const data2 = readFileSync('./package.json');
	// console.log(';;>>', data2.toString('utf8'));
}
