import Debug from 'debug';
import { createInterface } from 'readline';
import * as fs from 'fs';
import { createCommandOrUndefined } from './utils/CommandFactory';
import { ICommand, ReportCommand } from './command/Command';
import { Board, IBoard } from './board/Board';
import { Direction, Position } from './model/Model';
import { IRobot, Robot } from './robot/Robot';

const debug = Debug('app:debug');
const warn = Debug('app:warn');

/*
TODO: 
1- Move param init to out of App class
2- Move robot creation to App

*/
class App {

    private filePath: string;
    private rows: number;
    private columns: number;
    
    constructor() {
        this.filePath = process.env.COMMAND_FILE ?? '';
        this.columns = Number.parseInt(process.env.BOARD_COLUMNS ?? '0');
        this.rows = Number.parseInt(process.env.BOARD_ROWS ?? '0');
    }

    async runBoard() {
        if (!fs.existsSync(this.filePath)) {
            throw new Error(`File not found ${this.filePath}`);
        } else fs.access(this.filePath, fs.constants.R_OK, err => {
            if (err) {
                throw new Error(`${this.filePath} is not readable`);
            }
        })

        const fileStream = fs.createReadStream(this.filePath);

        const rl = createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        const board: IBoard = new Board(this.rows, this.columns);
        const robot: IRobot = new Robot(board);

        for await (const line of rl) {
            const command = createCommandOrUndefined(line);
            let success = false;
            if (command) {
                if (this.isReport(command)) {
                    const position: Position | undefined = board.getRobotPosition();
                    console.log(`Output: ${position?.getColumn()},${position?.getRow()},${position?.getFacing()}`);
                    success = true;
                } else {
                    success = board.runCommand(command);
                }
            } else {            
                warn(`Command for '${line}' is not valid`);
            }
            debug(`Command: ${line} is ${success ? '' : 'NOT'} successful`);
        }
        debug('Finish');
    }

    isReport(command: ICommand) {
        return command instanceof ReportCommand;
    }

}

const app = new App();
app.runBoard();