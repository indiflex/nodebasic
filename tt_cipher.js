import { MyCipher } from './utils/mycipher.js';
// const { MyCipher } = await import('./utils/mycipher.js');

const myCipher = new MyCipher();
const data = '@시코-시니어코딩';
const encryptedData = myCipher.encrypt(data);
console.log('ENC>>', encryptedData);
const descryptedData = myCipher.decrypt(encryptedData);
console.log('결과>>', descryptedData, descryptedData === data);
