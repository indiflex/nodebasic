import { join, basename } from 'path';
import { existsSync } from 'fs';
import { readFile, writeFile, readdir, mkdir, rm } from 'fs/promises';

const { pathname: curr } = new URL('.', import.meta.url);
// const curr = '/Users/jade/workspace/fpp/jade/js/nodes/';
console.log(curr);

const kingFld = join(curr, 'kings');
const sejongFld = join(kingFld, 'sejong');
const kingNameFile = join(kingFld, 'king-names.txt');
const sejongFile = join(sejongFld, 'sejong.txt');

try {
	// 1. folder 생성
	if (!existsSync(sejongFld)) await mkdir(sejongFld, { recursive: true });

	if (!existsSync(kingNameFile)) await writeFile(kingNameFile, '세종대왕');
	if (!existsSync(sejongFile))
		await writeFile(join(sejongFld, 'sejong.txt'), '훈민정음');

	// 2. folder tree
	const ls = async (fld, depth = 0) => {
		const bname = basename(fld);
		console.log('  '.repeat(depth), bname);
		const files = await readdir(fld, { withFileTypes: true });
		for (const file of files) {
			if (
				!file.isDirectory() ||
				file.name.startsWith('.') ||
				file.name === 'node_modules'
			)
				continue;

			await ls(join(fld, file.name), depth + 1);
		}
	};

	await ls(curr);

	// 3. 파일 내용 출력 & kings 폴더 삭제
	[kingNameFile, sejongFile].forEach(f => {
		readFile(f, 'utf8').then(data => {
			console.log('-------------------', basename(f));
			console.log(data);
		});
	});

	rm(kingFld, { recursive: true, force: true });

	// 4. non-block folder tree
	const result = {};
	const printResult = (obj, depth = 0) => {
		for (const k of Object.keys(obj)) {
			console.log(`${'  '.repeat(depth)}${k}`);
			printResult(obj[k], depth + 1);
		}
	};

	let pendingCnt = 0;
	const ls2 = (fld, obj) => {
		const bname = basename(fld);
		obj[bname] = {};
		readdir(fld, { withFileTypes: true })
			.then(files => {
				for (const file of files) {
					const { name } = file;
					if (
						!file.isDirectory() ||
						name.startsWith('.') ||
						name === 'node_modules'
					)
						continue;

					pendingCnt += 1;
					ls2(join(fld, name), obj[bname]);
				}
			})
			.catch(error => console.error('Error>>', error))
			.finally(() => {
				pendingCnt -= 1;
				// console.log('pending>>', pendingCnt);
				if (pendingCnt < 0) printResult(result);
			});
	};

	ls2(curr, result);
} catch (error) {}
