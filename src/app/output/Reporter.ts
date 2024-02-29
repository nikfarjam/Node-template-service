import { Writable } from "stream";
import { Position } from "../model/Model";

interface IReporter {
    report(position?: Position): void;
}

class ConsoleReporter implements IReporter {

    private EMPTY_BOARD = 'Output: Robot has not been palced on the board\n';

    private writeable: Writable;

    constructor(writeable: Writable) {
        this.writeable = writeable;
    }

    report(position?: Position): void {
        if (!position) {
            this.writeable.write(this.EMPTY_BOARD);
        } else {
            this.writeable.write(`Output: ${position.column},${position.row},${position.facing}\n`);
        }
    }

}

export { IReporter, ConsoleReporter }