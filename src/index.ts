import { Readable } from "stream";
import { parse as defaultFormParser, ParsedUrlQuery } from "querystring";

interface JoinTextOptions {
    stream: Readable;
    encoding?: string;
}

function text(options: JoinTextOptions | Readable, callback: (err: Error | null, data: string) => void) {
    if (options instanceof Readable) {
        options = { stream: options };
    }
    const { stream, encoding = 'utf8' } = options;
    let ans = '';
    stream.on('data', chunk => {
        if (typeof chunk === 'string') {
            ans += chunk;
        } else {
            ans += chunk.toString(encoding);
        }
    }).on('error', err => {
        callback(err, '');
    }).on('end', () => {
        callback(null, ans);
    });
}

const defaultJSONParser = JSON.parse;

interface JoinJSONOptions extends JoinTextOptions {
    parser?: (data: string) => any;
}

function json(options: JoinJSONOptions | Readable, callback: (err: Error | null, data: any) => void) {
    if (options instanceof Readable) {
        options = { stream: options };
    }
    text(options, (error, data) => {
        if (error) {
            callback(error, undefined);
        } else {
            try {
                const { parser = defaultJSONParser } = options as JoinJSONOptions;
                callback(null, parser(data));
            } catch (err) {
                callback(err, undefined);
            }
        }
    });
}

interface JoinFormOptions extends JoinTextOptions {
    parser?: (data: string) => ParsedUrlQuery;
}

function form(options: JoinFormOptions | Readable, callback: (err: Error | null, data: ParsedUrlQuery) => void) {
    if (options instanceof Readable) {
        options = { stream: options };
    }
    text(options, (error, data) => {
        if (error) {
            callback(error, {});
        } else {
            const { parser = defaultFormParser } = options as JoinFormOptions;
            callback(null, parser(data));
        }
    });
}

export { text, form, json };
