/**
 * @file 3h-join.js
 * @author 3h
 */

const query = require('querystring');

/**
 * @description To join text body.
 * @param {stream.Readable} input The input stream.
 * @param {(err: Error, data: string) => void} callback The callback function.
 */
const text = (input, callback) => {
    let ans = [];
    input.on('error', err => {
        callback(err);
    }).on('data', chunk => {
        ans.push(chunk);
    }).on('end', () => {
        callback(null, Buffer.concat(ans).toString());
    });
};

/**
 * @description To join json body.
 * @param {stream.Readable} input The input stream.
 * @param {(err: Error, data: Object) => void} callback The callback function.
 */
const json = (input, callback) => {
    text(input, (err, data) => {
        if (err) {
            callback(err);
        } else {
            let ans;
            try {
                ans = JSON.parse(data);
                callback(null, ans);
            } catch (e) {
                callback(err);
            }
        }
    });
};

/**
 * @description To join form body.
 * @param {stream.Readable} input The input stream.
 * @param {(err: Error, data: Object) => void} callback The callback function.
 */
const form = (input, callback) => {
    text(input, (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, query.parse(data));
        }
    });
};

module.exports = { text, json, form };