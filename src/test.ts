const debug = require('debug')('test');

import {sum} from './func'







type Val = number | string | boolean;

function check(expected: Val, result: Val, message?: string) {
    debug(`Expected result is ${expected} but actual value is ${result}`);
    if (expected === result) {
        return;
    }

    let errorMsg = message;
    if (!message || message.trim().length === 0) {
        errorMsg = `Expected result is ${expected} but actual value is ${result}`;
    }
    throw new Error(errorMsg);
}


function checkArray(expected: Array<Val>, result: Array<Val>, message?: string) {
    debug(`Expected result is ${expected} but actual value is ${result}`);
    if (expected === result) {
        return;
    }

    let errorMsg = message;
    if (!message || message.trim().length === 0) {
        errorMsg = `Expected result is ${expected} but actual value is ${result}`;
    }
    if (expected.length !== result.length) {
        throw new Error(errorMsg);
    }
    for (let i=0; i < expected.length; i++) {
        check(expected[i], result[i], errorMsg);
    }
}


