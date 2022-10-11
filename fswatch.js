import fs from 'fs';
import { Console } from 'console';
const stdout = fs.createWriteStream('./stdout.log');
const stderr = fs.createWriteStream('./stderr.log');
const logger = new Console({ stdout, stderr });

logger.log('log>>', 'LOG');
logger.error('error>>', 'Err');

// fs.watchFile('./stdout.log', { interval: 500 }, (curr, prev) => {
// 	console.log('curr>', curr);
// 	console.log('prev>', prev);
// });

// cf. let codes = require('./codes');
// import * as aa from './codes.js';
import { deptCodes as aa } from './codes.js';
let codes = aa;
const printCodes = () => console.log('codes>>', codes);
printCodes();

fs.watchFile('./codes.js', { interval: 500 }, async () => {
	// const deptCodes = await import(`./codes.js?update=${new Date()}`);
	// codes = deptCodes.deptCodes;
	// codes = deptCodes.deptCodes;
	codes = (await import(`./codes.js?update=${new Date()}`)).deptCodes;
	console.log('code>>', codes);
	printCodes();
});
