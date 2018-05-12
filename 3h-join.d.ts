import stream from 'stream';

declare namespace join {
    export function text(input: stream.Readable, callback: (err: Error | null, data: string) => void): void;
    export function json(input: stream.Readable, callback: (err: Error | null, obj: object) => void): void;
    export function form(input: stream.Readable, callback: (err: Error | null, body: object) => void): void;
}

export = join;