import { Direction, Position } from "../model/Model";
import { ICommand, LeftCommand, MoveCommand, PlaceCommand, ReportCommand, RightCommand } from "../command/Command"


const MOVE = new MoveCommand();
const REPORT = new ReportCommand();
const LEFT = new LeftCommand();
const RIGHT = new RightCommand();

function createCommandOrUndefined(cmd: string): ICommand | undefined {
    const PLACE = /^PLACE\s+(\d)\s*,\s*(\d)\s*,\s*(NORTH|EAST|SOUTH|WEST)$/g;

    if (!cmd) {
        return undefined;
    }
    const command = cmd.replaceAll(/^\s+|\s+$/g, '').toLocaleUpperCase();

    switch (command) {
        case 'MOVE': return MOVE;
        case 'LEFT': return LEFT;
        case 'RIGHT': return RIGHT;
        case 'REPORT': return REPORT;
    }

    const place: RegExpExecArray | null = PLACE.exec(command);
    if (place) {
        // With RegEx, place parameters must be valid
        const direction = convertStrToDirection(place[3]);
        const column = Number.parseInt(place[1]);
        const row = Number.parseInt(place[2]);
        if (direction && Number.isInteger(row) && Number.isInteger(column)) {
            return new PlaceCommand({ row, column, facing: direction });
        }
    }
    return undefined;
}

function convertStrToDirection(str: string): Direction | undefined {
    switch (str) {
        case 'EAST': return Direction.EAST;
        case 'NORTH': return Direction.NORTH;
        case 'WEST': return Direction.WEST;
        case 'SOUTH': return Direction.SOUTH;
        default: return undefined;
    }
}

export { createCommandOrUndefined }