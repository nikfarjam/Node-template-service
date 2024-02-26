import { Position } from "../model/Model";
import { IRobot, Robot } from "../robot/Robot";
import { ICommand, PlaceCommand } from "../command/Command";

interface IPositionValidator {
    isAllowed(position: Position): boolean;
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
        if (rows < 0) {
            throw new Error(`Invalid row numebr: ${rows}`);
        }
        if (columns < 0) {
            throw new Error(`Invalid column numebr: ${columns}`);
        }
        this.rows = rows;
        this.columns = columns;
    }

    runCommand(command: ICommand): boolean {
        if (!this.robot) {
            // waiting for valid PLACE command
            if (command instanceof PlaceCommand) {
                const position = (command as PlaceCommand).getPosition();
                if (this.isAllowed(position)) {
                    this.robot = new Robot(position, this);
                    return true;
                }
                return false;
            }
        } else {
            return command.execute(this.robot);
        }
        return false;
    }

    getRobotPosition(): Position  | undefined{
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

}

export { IPositionValidator, Board, IBoard }