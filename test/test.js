const { text, json, form } = require('../'),
    { PassThrough } = require('stream');

function receive(data) {
    console.log(`Received: ${JSON.stringify(data)}`);
}

const textStream = new PassThrough();
text({ stream: textStream }, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        receive(data);
    }
});
textStream.write(new Buffer('Hello,'));
textStream.end('text!');

const jsonStream = new PassThrough();
json({ stream: jsonStream }, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        receive(data);
    }
});
jsonStream.write(JSON.stringify({ hello: ',', j: ['s', 'o', 'n', '!'] }));
jsonStream.end();

const formStream = new PassThrough();
form({ stream: formStream }, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        receive(data);
    }
});
formStream.write('h=el&lo=');
formStream.end(new Buffer(',&f&o=rm!'));

