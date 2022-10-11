import util from 'util';
import crypto from 'crypto';
const data = '1234';
const salt = crypto.randomBytes(64).toString('base64');

crypto.pbkdf2(data, salt, 100000, 128, 'sha512', (err, derivedKey) => {
	if (err) throw err;
	console.log('dk1>>', derivedKey.toString('base64')); // length: 256
});

const pb = util.promisify(crypto.pbkdf2);
const pdata = await pb(data, salt, 100000, 128, 'sha512');
console.log('ppp>>', pdata.toString('base64'));

const dk2 = crypto.pbkdf2Sync(data, salt, 100000, 128, 'sha512');
console.log('dk2>>', dk2.toString('base64').length);
