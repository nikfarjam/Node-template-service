import { Position } from "../model/Model";
import { IRobot } from "../robot/Robot";

interface ICommand {
    execute(robot: IRobot): boolean;
}

class LeftCommand implements ICommand {

    execute(robot: IRobot): boolean {
        robot.rotateLeft();
        return true;
    }
}

class RightCommand implements ICommand {
    execute(robot: IRobot): boolean {
        robot.rotateRight();
        return true;
    }
}

class MoveCommand implements ICommand {
    execute(robot: IRobot): boolean {
        return robot.move();
    }
}

class PlaceCommand implements ICommand {

    private position: Position;

    constructor(position: Position) {
        this.position = position;
    }

    public getPosition(): Position {
        return this.position;
    }

    execute(robot: IRobot): boolean {
        robot.dummy();
        return false;
    }
}

class ReportCommand implements ICommand {
    execute(robot: IRobot): boolean {
        robot.dummy();
        return false;
    }
}


export {ICommand, LeftCommand, RightCommand, MoveCommand, PlaceCommand, ReportCommand}