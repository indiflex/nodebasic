import crypto from 'crypto';
const data = '@시코-시니어코딩';
const salt = crypto.randomBytes(64).toString('base64');
const iv = crypto.randomBytes(16);
const digest = 'base64';
const algorithm = 'aes-256-cbc'; // aes-128-cbc(128/8 = 16), aes-192-cbc(192/8 = 24), 256 / 8 = 32
const strEncryptKey = '1234567890123456'.repeat(2);

const key1 = Buffer.from(strEncryptKey); // 암복호화 키가 불변이므로, iv = crypto.randomBytes(16);
const key2 = crypto.scryptSync(data, salt, 256 / 8); // salt가 가변이므로, iv = Buffer.alloc(16, 0);
const cipher = crypto.createCipheriv(algorithm, key2, iv);
// const encUpdateBuffer = cipher.update(data);
const encUpdateBuffers = [cipher.update(data), cipher.update('1234')];
const encryptedData = Buffer.concat([
	...encUpdateBuffers,
	cipher.final(),
]).toString(digest);
const encObj = { iv: iv.toString('hex'), data: encryptedData };
console.log('aaa>>>', encObj);

const decipher = crypto.createDecipheriv(algorithm, key2, iv);
const decUpdateBuffer = decipher.update(encryptedData, digest);
const decryptedData = Buffer.concat([
	decUpdateBuffer,
	decipher.final(),
]).toString();

console.log(data, decryptedData, data === decryptedData);
