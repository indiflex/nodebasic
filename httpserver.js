import { createServer } from 'http';
import { readFile, createReadStream } from 'fs';

const server = createServer((req, res) => {
	// console.log('rurl>>', req.url, req.method);
	const { searchParams: param, pathname } = new URL(
		req.url || '',
		`http://${req.headers.host}`
	);
	console.log(param, pathname);

	const router = () => ({
		['/'](body) {
			res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
			res.write(`<h1>HTTP Server</h1>`);
			res.end(`
      <h3>My name is ${param.get('name')}</h3>
      <h5>Your name is ${body.get('nm')} (${body.get('age')})</h5>
      <form name="fm" method="POST">
      <input type="text" name="nm" value="강감찬" />
      <input type="text" name="age" value="30" />
      <button type="submit">Submit</button>
      </form>
      <img src="/testimg.png" alt="testimg" width="300" />
      `);
		},

		['/json'](body) {
			const j = { id: 1, name: '홍길동' };
			console.log('body>>>>>', body);
			res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
			if (req.method === 'POST') {
				j.nm = body['nm'];
				j.age = body.age;
			}
			res.end(JSON.stringify(j));
		},

		['/favicon.ico']() {
			res.writeHead(200, { 'Content-Type': 'image/x-icon' });
			const favRs = createReadStream('./public/favicon.ico');
			favRs.pipe(res);
		},

		['/testimg.png']() {
			readFile('./public/node.png', (err, data) => {
				res.end(data);
			});
		},
	});

	req.setEncoding('utf-8');
	let body = '';
	req.on('data', chunk => {
		body += decodeURI(chunk);
		console.log('server.chunk>>', body);
	});
	req.on('end', () => {
		// console.log('end>>', body, '=>', new URLSearchParams(body));
		console.log('>>>>>>>', pathname);
		const p =
			req.method === 'POST' ? JSON.parse(body) : new URLSearchParams(body);
		router()[pathname](p);
	});
}).listen(80, () => console.log('start server'));

server.on('error', error => console.error('ERROR>>', error));
server.on('close', () => console.log('server closed!!'));
