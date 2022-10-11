import { EventEmitter, errorMonitor } from 'events';
const evtEmitter = new EventEmitter();

const lfn1 = data => console.log('lfn1>>', data);

evtEmitter.addListener('evt1', (...args) => console.log('evt1>>', args));
evtEmitter.prependListener('evt1', data => console.log('PREPEND>>', data));

evtEmitter.on('evt1', lfn1);

evtEmitter.on('evt2', data => console.log('evt2--->>>', data));

evtEmitter.emit('evt1', '11111');
evtEmitter.emit('evt1', '111');
evtEmitter.emit('evt2', '222');

evtEmitter.removeListener('evt1', lfn1);
evtEmitter.emit('evt1', '111-2');

evtEmitter.once('evt3', data => console.log('evt2--->>>', data));

// server session.  X: md1    --> X === md1 -> exp X -> res
// client X hidden --> submit -->

evtEmitter.emit('evt3', '333-1');
evtEmitter.emit('evt3', '333-2');

// evtEmitter.on('error', err => console.error('ERR>>', err.message));
evtEmitter.on(errorMonitor, err => console.error('ERR>>', err.message));

try {
	evtEmitter.emit('error', new Error('xxx'));
} catch (ErEr) {
	console.log('ErEr---->>', ErEr);
}

const cnt = evtEmitter.listenerCount('evt1');
console.log('cnt>>>>', cnt);
