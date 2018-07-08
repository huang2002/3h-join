"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const querystring_1 = require("querystring");
function text(options, callback) {
    if (options instanceof stream_1.Readable) {
        options = { stream: options };
    }
    const { stream, encoding = 'utf8' } = options;
    let ans = '';
    stream.on('data', chunk => {
        if (typeof chunk === 'string') {
            ans += chunk;
        }
        else {
            ans += chunk.toString(encoding);
        }
    }).on('error', err => {
        callback(err, '');
    }).on('end', () => {
        callback(null, ans);
    });
}
exports.text = text;
const defaultJSONParser = JSON.parse;
function json(options, callback) {
    if (options instanceof stream_1.Readable) {
        options = { stream: options };
    }
    text(options, (error, data) => {
        if (error) {
            callback(error, undefined);
        }
        else {
            try {
                const { parser = defaultJSONParser } = options;
                callback(null, parser(data));
            }
            catch (err) {
                callback(err, undefined);
            }
        }
    });
}
exports.json = json;
function form(options, callback) {
    if (options instanceof stream_1.Readable) {
        options = { stream: options };
    }
    text(options, (error, data) => {
        if (error) {
            callback(error, {});
        }
        else {
            const { parser = querystring_1.parse } = options;
            callback(null, parser(data));
        }
    });
}
exports.form = form;
