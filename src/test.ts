import {sum} from './func'

check(5, sum(2,3));
checkArray([2,3, 1], [2,3]);


function check(expected: number | string | boolean, result: number | string | boolean, message?: string) {
    if (expected === result) {
        return;
    }

    let errorMsg = message;
    if (!message || message.trim().length === 0) {
        errorMsg = `Expected result is ${expected} but actual value is ${result}`;
    }
    throw new Error(errorMsg);
}


function checkArray(expected: Array<number | string | boolean>, result: Array<number | string | boolean>, message?: string) {
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


