import { toUnicode, toASCII } from 'punycode';

const sampleUrl =
	'https://jade:1234케잌@도메인.com:8080/p/a/한글/h?query=string&city=서울#hash';

const xxFn = function ({
	fragment = true,
	auth = true,
	search = true,
	unicode = false,
} = {}) {
	// const isMyURL = this instanceof MyURL;
	// if (isMyURL && fragment && auth && search && !unicode) {
	// 	console.log('********************', isMyURL);
	// 	return xf();
	// }

	const rets = [];
	rets.push(this.protocol);
	rets.push('//');
	if (auth) {
		rets.push(this.username);
		rets.push(':');
		rets.push(this.password);
		rets.push('@');
	}

	rets.push(unicode ? toUnicode(this.host) : this.host);
	// rets.push(unicode ? toASCII(this.host) : this.host);

	rets.push(this.pathname);
	if (search) rets.push(this.search);
	if (fragment) rets.push(this.hash);

	if (unicode) return decodeURI(rets.join(''));

	return rets.join('');
};

class MyURL extends URL {
	toString = xxFn;
}

const option = { fragment: true, auth: true, unicode: true };

const myurl = new MyURL(sampleUrl);
console.log('mine>>', myurl.toString(option));

// URL.prototype.toString = xxFn;
// const _url = new URL(sampleUrl);
// console.log('core>>', _url.toString(option));
// console.log('core>>', _url.toString());
