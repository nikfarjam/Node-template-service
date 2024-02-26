import Debug from 'debug';
import { createInterface } from 'readline';
import * as fs from 'fs';
import { createCommandOrUndefined } from './utils/CommandFactory';
import { ICommand, ReportCommand } from './command/Command';
import { Board, IBoard } from './board/Board';
import { Position } from './model/Model';

const debug = Debug('app:debug');
const error = Debug('app:error');

const filePath = '/workspaces/Node-template-service/data/sample1.txt';

class App {

    async runBoard() {
        if (!fs.existsSync(filePath)) {
            throw new Error('File not found');
        }

        const fileStream = fs.createReadStream(filePath);

        const rl = createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        const board: IBoard = new Board(5, 5);

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
                error(`Command for '${line}' is not valid`);
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