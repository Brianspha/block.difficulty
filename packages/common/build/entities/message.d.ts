import { Types } from '..';
export declare class Message {
    type: Types.MessageType;
    ts: number;
    params: any;
    constructor(type: Types.MessageType, params?: any);
    get JSON(): {
        type: Types.MessageType;
        ts: number;
        params: any;
    };
}
