import Debug from 'debug';
import { createCommandOrUndefined } from './utils/CommandFactory';
import { ReportCommand } from './command/Command';
import { Board, IBoard } from './board/Board';
import { Position } from './model/Model';
import { Robot } from './robot/Robot';
import { fileReader } from './input/CommandReader'
import { Readable } from 'stream';
import { IReporter, ConsoleReporter } from './output/Reporter';
import { showErrorMessage } from './utils/Console';

const debug = Debug('app:debug');
const warn = Debug('app:warn');

class App {

    private board: IBoard;
    private commandStream: Readable;
    private reporters: IReporter[];

    constructor(board: IBoard, commandStream: Readable, reporters: IReporter[]) {
        this.board = board;
        this.commandStream = commandStream;
        this.reporters = reporters;
    }

    async runBoard() {
        try {
            for await (const line of this.commandStream) {
                const command = createCommandOrUndefined(line);
                if (!command) {
                    warn(`Command '${line}' is not valid`);
                } else if (command instanceof ReportCommand) {
                    this.reportPosition(this.board);
                } else {
                    const success = this.board.runCommand(command);
                    debug(`Command: ${line} is ${success ? '' : 'NOT'} successful`);
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                showErrorMessage(err.message);
            } else {
                showErrorMessage('General error');
            }
        }
    }

    reportPosition(board: IBoard) {
        const position: Position | undefined = board.getRobotPosition();
        for (const r of this.reporters) {
            r.report(position);
        }
    }

}

const DEFAULT_SIZE = 5;
const COMMAND_INPUT = 'FILE';

const columns = process.env.BOARD_SIZE && Number.parseInt(process.env.BOARD_SIZE) ? Number.parseInt(process.env.BOARD_SIZE) : DEFAULT_SIZE;
const rows = columns;

function getInputFilePath(): string {
    if (process.argv.length > 2 && process.argv[2]) {
        return process.argv[2];
    }
    if (process.env.COMMAND_FILE) {
        return process.env.COMMAND_FILE;
    }
    throw new Error(`Input file is missed
    You can pass it as applicaltion arg like 'node main.js data.txt'
    Or as environment variable like 'COMMAND_FILE=data.txt node main.js'`);
}

function createCommandStream(): Readable {
    if (COMMAND_INPUT === 'FILE') {
        return fileReader(getInputFilePath());
    }
    return fileReader(getInputFilePath());
}

try {
    const board: IBoard = new Board(rows, columns);
    new Robot(board);
    const cammandStream = createCommandStream();
    const reporters = [new ConsoleReporter(process.stdout)];

    const app = new App(board, cammandStream, reporters);
    app.runBoard();
} catch (err) {
    if (err instanceof Error) {
        showErrorMessage(err.message);
    } else {
        showErrorMessage('General error');
    }
}

export default App;