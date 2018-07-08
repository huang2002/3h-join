# 3h-join

A stream body parser.

# Example

```javascript
const join = require('3h-join');

function callback(err, data) {
    if (err) {
        console.error('Error while reading stream: ', err);
    } else {
        console.log(`Received: ${JSON.stringify(data)}`);
    }
}

join.text({ stream: textStream }, callback);

join.json({
    stream: jsonStream,
    // parser: myJSONParser
}, callback);

join.form({
    stream: formStream,
    // parser: myFormParser
}, callback);

```

# APIs

See [`the declaration file`](typings/index.d.ts) to learn the APIs.
