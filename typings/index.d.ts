/// <reference types="node" />
import { Readable } from "stream";
import { ParsedUrlQuery } from "querystring";
interface JoinTextOptions {
    stream: Readable;
    encoding?: string;
}
declare function text(options: JoinTextOptions | Readable, callback: (err: Error | null, data: string) => void): void;
interface JoinJSONOptions extends JoinTextOptions {
    parser?: (data: string) => any;
}
declare function json(options: JoinJSONOptions | Readable, callback: (err: Error | null, data: any) => void): void;
interface JoinFormOptions extends JoinTextOptions {
    parser?: (data: string) => ParsedUrlQuery;
}
declare function form(options: JoinFormOptions | Readable, callback: (err: Error | null, data: ParsedUrlQuery) => void): void;
export { text, form, json };
//# sourceMappingURL=index.d.ts.map