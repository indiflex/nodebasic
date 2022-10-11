import { dirname, sep } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import { a } from './nodeutils.js';

console.log('process.argv>>>', process.argv);
console.log(process.argv[2]);

// console.log(import.meta.url);
// console.log('sep>>>', sep);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// export { __filename, __dirname };

// console.log(__dirname);
// console.log(__filename);

// console.log(global);
// console.log(global.xx);
// const filepath = '/Users/jade/workspace';
const filepath = path.join(__dirname, 'nodeutils.js');
console.log(filepath, path.isAbsolute(filepath));
// console.log(path.parse(filepath));
const x = path.format({
	root: '/',
	dir: '/Users/jade/workspace/fpp/nodebasic',
	base: 'nodeutils.js',
	ext: '.js',
	name: 'nodeutils',
});
// console.log(path.basename(x), path.parse(x));
// console.log(path.posix);

import os from 'os';
console.log(os.cpus().length);
const m = 1024 * 1024;
// console.log(os.freemem() / m, '/', os.totalmem() / m);
// console.log(os.hostname());

// console.log(process.env.XX);
// process.on('exit', (...args) => console.log('EXIT>>', args));
// process.on('beforeExit', (...args) => console.log('beforeExit>>', args));

// setTimeout(() => console.log('TimeOut!!!!!!'), 1000);
// setTimeout(() => console.log('TimeOut!!!!!!'), 0);
// setImmediate(() => console.log('setImmediate!!!!!!'));
// process.nextTick(() => console.log('nextTick!!!!!!'));

// import fs from 'fs';
// fs.readFile('./xxx.txt', (err, data) => {
// 	console.log(data);
// });
// process.on('uncaughtException', err => {
// 	console.error('uncaughtException>>', err);
// 	// process.exit(1);
// });

import url from 'url';
import { start } from 'repl';
const sampleUrl =
	'https://user:pass케잌@sub.example.com:8080/p/a/t/h?query=string#hash';
// const parsedUrl = url.parse(sampleUrl);
// console.log(parsedUrl); // Url type (urlObject)
// console.log(url.format(parsedUrl, { auth: false, fragment: false }));
console.log('--------------------');

const surl = new URL(sampleUrl); // same as new url.URL(sampleUrl)
console.log(surl, surl instanceof URL); // URL type
console.log('FF>>', url.format(surl, { auth: false, fragment: false }));
// console.log(surl.href, surl.origin, surl.pathname, surl.search, surl.hash);
console.log(surl.toString()); // https://user:pass@sub.example.com:8080/p/a/t/h?query=string&name=Hong

const sp = surl.searchParams;
sp.append('name', 'Hong');
console.log('name>>', sp.get('name'));
sp.append('name', 'Kim');
console.log('name>>', sp.getAll('name'));
{
	/* <input type='checkbox' id='name1' name='name' value='Hong' />
  <input type='checkbox' id='name2' name='name' value='Kim' /> */
}
console.log(sp.toString());
sp.forEach((value, key) => console.log(key, ':', value));

console.log('===============================');
const str = 'AZaz🏀123케잌45';
const buf1 = Buffer.from(str);
console.log(buf1);
console.log(buf1.toString());

console.log('--------------------');
const buf2 = Buffer.from('1as', 'hex');
console.log('buf2>>', buf2, buf2.toString('hex'));
console.log('latin1>>', Buffer.from('1as잌', 'latin1'));
console.log(Buffer.from('1as잌', 'binary'));
const buf3 = Buffer.from('1as잌', 'ascii');
console.log('buf3>>', buf3, buf3.toString('utf8'));
const buf4 = Buffer.from('1as잌', 'utf8');
console.log('buf4>>', buf4, buf4.toString('utf8'));
console.log('utf8>>', Buffer.from('1as잌', 'utf8'));
console.log(Buffer.from('1as', 'base64'));
console.log('base64>>', Buffer.from('1as*Z', 'base64'));
console.log('1as*Z'.toString());
console.log(Buffer.alloc(8, 'A'));
