# 3h-join.js

> A simple lib to join the body of streams ( and maybe parse it ).

## Install

```
$ npm install 3h-join
```

## API

- join.text(input: ReadableStream, callback: (err: Error, data: string) => void) - *To join the text body.*
- join.json(input: ReadableStream, callback: (err: Error, obj: Object) => void) - *To join the json body.*
- join.form(input: ReadableStream, callback: (err: Error, body: Object) => void) - *To join the form body.*

## Example

```javascript
const join = require('3h-join'),
    http = require('http');
http.createSever((req, res) => {
    if (req.method.toUpperCase() === 'POST') {
        switch (req.headers['Content-Type']) {
            case 'text/plain':
                join.text(req, (err, data) => {
                    if (err) {
                        reportError(err);
                    } else {
                        receiveText(data);
                    }
                });
                break;
            case 'application/json':
                join.json(req, (err, obj) => {
                    if (err) {
                        reportError(err);
                    } else {
                        receiveJson(obj);
                    }
                });
                break;
            case 'application/x-www-form-urlencoded':
                join.form(req, (err, body) => {
                    if (err) {
                        reportError(err);
                    } else {
                        receiveForm(body);
                    }
                });
                break;
            default:
                //...
        }
    } else {
        // ...
    }
}).on('error', err => {
    reportError(err);
}).listen(port);
```