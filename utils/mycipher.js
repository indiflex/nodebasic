import crypto from 'crypto';
const KEY = Buffer.from('seniorcoding!@#$'.repeat(2)); // 256 / 8 = 32 length만 지키고 자유롭게 사용하세요.
const ALGORITHM = 'aes-256-cbc'; // 원하는 알고리즘을 입력하세요.
const DIGEST = 'base64'; // hex로 해도 무관합니다.

console.log('MyCipher>>', ALGORITHM, KEY.byteLength, DIGEST);

class MyCipher {
	constructor() {
		this.iv = crypto.randomBytes(16);
	}

	/**
	 * 암호화
	 * @param {string} data
	 * @return 암호화된 값
	 */
	encrypt(data) {
		const cipher = crypto.createCipheriv(ALGORITHM, KEY, this.iv);
		const encUpdateBuffer = cipher.update(data);
		const encryptedData = Buffer.concat([
			encUpdateBuffer,
			cipher.final(),
		]).toString(DIGEST);

		return `${this.iv.toString('hex')}:${encryptedData}`;
	}

	decrypt(encryptedData) {
		const [iv, encData] = encryptedData.split(':');
		const decipher = crypto.createDecipheriv(
			ALGORITHM,
			KEY,
			Buffer.from(iv, 'hex')
		);
		const decUpdateBuffer = decipher.update(encData, DIGEST);
		return Buffer.concat([decUpdateBuffer, decipher.final()]).toString();
	}
}

const argvLen = process.argv?.length;
if (argvLen > 2 && argvLen !== 4) {
	console.log('usage> node mycipher [-e|-enc] data');
	console.log('usage> node mycipher [-d|-dec] encryptedData');
	process.exit(1);
}

if (argvLen === 4) {
	const flag = process.argv[2];
	const data = process.argv[3];
	const mycipher = new MyCipher();
	if (flag?.startsWith('-e')) {
		console.log(mycipher.encrypt(data));
	} else if (flag?.startsWith('-d')) {
		console.log(mycipher.decrypt(data));
	}
}

export { MyCipher };
