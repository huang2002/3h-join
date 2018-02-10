const join = require('../3h-join'),
    http = require('http'),
    query = require('querystring'),
    assert = require('assert');

const PORT = 999;

const sever = http.createServer((req, res) => {
    res.end();
    const tag = req.url.slice(1);
    join[tag](req, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            assert.deepEqual(ANS[tag], data);
            console.log(`Test succeeded! ( Tag:${tag}. )`);
        }
    });
    tests.delete(tag);
    if (tests.size === 0) {
        sever.close();
    }
}).on('error', err => {
    console.log('Sever error occurs!');
    console.error(err);
    sever.close();
}).listen(PORT);

const DATA = {
    json: '{ "msg": "This is the test data for json." }',
    text: 'This is the test data for text.',
    form: 'test=true&target=join'
};

const ANS = {
    json: JSON.parse(DATA.json),
    text: DATA.text,
    form: query.parse(DATA.form)
};

function test(tag) {
    const data = DATA[tag];
    const req = http.request({
        method: 'POST',
        hostname: 'localhost',
        port: PORT,
        path: '/' + tag,
        headers: {
            'Content-type': 'text/plain;charset=UTF-8',
            'Content-Length': Buffer.byteLength(data)
        }
    }).on('error', err => {
        console.log('Request error occurs!');
        console.error(err);
        sever.close();
    });
    req.write(data);
    req.end();
}

const tests = new Set(['text', 'json', 'form']);
tests.forEach(test);