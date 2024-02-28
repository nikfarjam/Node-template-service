import { Position } from "../model/Model";
import { IRobot } from "../robot/Robot";
import { ICommand, PlaceCommand } from "../command/Command";
import Debug from 'debug';

const debug = Debug('board:debug');

interface IPositionValidator {
    isAllowed(position: Position): boolean;
    addRobot(robot: IRobot): boolean;
}

interface IBoard extends IPositionValidator {
    runCommand(command: ICommand): boolean;
    getRobotPosition(): Position | undefined;
}

class Board implements IBoard {
    private rows: number;
    private columns: number;
    private robot: IRobot | undefined;

    constructor(rows: number, columns: number) {
        if (Number.isNaN(rows) || rows < 0) {
            throw new Error(`Invalid row numebr: ${rows}`);
        }
        if (Number.isNaN(columns) || columns < 0) {
            throw new Error(`Invalid column numebr: ${columns}`);
        }
        this.rows = rows;
        this.columns = columns;
        debug(`Initiated Board [rows = ${this.rows}, columns = ${this.columns}]`);
    }

    runCommand(command: ICommand): boolean {
        if (!this.robot) {
            return false;
        }
        if (!this.robot?.getPosition()) {
            if (command instanceof PlaceCommand) {
                return command.execute(this.robot);
            } else {
                // Ignore commands until place the robot
                return false;
            }
        } else {
            return command.execute(this.robot);
        }
    }

    getRobotPosition(): Position | undefined {
        if (this.robot) {
            return this.robot.getPosition();
        }
        return undefined;
    }

    isAllowed(position: Position): boolean {
        if (position.getRow() < 0 || position.getRow() >= this.rows) {
            return false;
        }
        if (position.getColumn() < 0 || position.getColumn() >= this.columns) {
            return false;
        }
        return true;
    }

    addRobot(robot: IRobot): boolean {
        if (this.robot) {
            return false;
        }
        this.robot = robot;
        return true;
    }

}

export { IPositionValidator, Board, IBoard }