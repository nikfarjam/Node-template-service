import { Direction, Position } from "../model/Model";
import { ICommand, LeftCommand, MoveCommand, PlaceCommand, ReportCommand, RightCommand } from "./Command"

const PLACE = /^PLACE(\d),(\d),(NORTH|EAST|SOUTH|WEST)$/g;

const MOVE = new MoveCommand();
const REPORT = new ReportCommand();
const LEFT = new LeftCommand();
const RIGHT = new RightCommand();

function createCommandOrUndefined(cmd: string): ICommand | undefined {
    if (!cmd) {
        return undefined;
    }
    const command = cmd.replaceAll(/\s*/g, '').toLocaleUpperCase();

    switch(command) {
        case 'MOVE': return MOVE;
        case 'LEFT': return LEFT;
        case 'RIGHT': return RIGHT;
        case 'REPORT': return REPORT;        
    }

    const place: RegExpExecArray | null = PLACE.exec(command);
    if (place) {
        const position = new Position(
            Number.parseInt(place[1]),
            Number.parseInt(place[2]),
            convertStrToDirection(place[3]));
        return new PlaceCommand(position);
    }
    return undefined;
}

function convertStrToDirection(str: string): Direction {
    switch (str) {
        case 'EAST': return Direction.EAST;
        case 'NORTH': return Direction.NORTH;
        case 'WEST': return Direction.WEST;
        case 'SOUTH': return Direction.SOUTH;
        default: throw Error(`Invalid Direction: ${str}`);
    }
}

export { createCommandOrUndefined }