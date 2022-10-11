import crypto from 'crypto';

const salt = crypto.randomBytes(64).toString('base64');

const encryptPassword = (data, salting = salt, hashCnt = 16384) =>
	new Promise((resolve, reject) => {
		crypto.pbkdf2(data, salting, hashCnt, 128, 'sha512', (err, derivedKey) => {
			if (err) reject(err);
			resolve(derivedKey.toString('base64')); // length: 256
		});
	});

const data = 'abc홍길동123#$%';
// const encryptedPassword = await encryptPassword(data, salt, 100000);
// console.log('암호화된 Password>>', encryptedPassword);

console.time('PBKDF2');
console.log('PBKDF2>>', await encryptPassword(data)); // 16384
console.timeEnd('PBKDF2');

console.time('SCRYPT');
console.log(
	'SCRYPT>>',
	crypto.scryptSync(data, salt, 128, { N: 16384 }).toString('base64')
);
console.timeEnd('SCRYPT');
