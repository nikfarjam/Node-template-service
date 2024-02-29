import { IPositionValidator } from "../board/Board";
import { Direction, Position } from "../model/Model";
import Debug from 'debug';

const debug = Debug('robot:debug');

interface IRobot {
    place(position: Position): boolean;

    getPosition(): Position | undefined;

    rotateLeft(): void;

    rotateRight(): void;

    move(): boolean;

    dummy(): void;
}

class Robot implements IRobot {

    private position: Position | undefined;
    private validator: IPositionValidator;
    private directions: Direction[];

    /**
     * Robot without a Board is not able to do anything
     * Therefore I use constructor to force to use Robot with the Board
     * @param validator A reference to the Board that Robot uses 
     * 1. To add itself to the board
     * 2. To check if robot can move/place to a position
     * 
     */
    constructor(validator: IPositionValidator) {
        this.validator = validator;
        this.validator.addRobot(this);
        this.directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];
    }

    place(position: Position): boolean {
        return this.updatePosition(position);
    }

    private updatePosition(position: Position): boolean {
        if (this.validator.isAllowed(position)) {
            this.position = position;
            debug(`Robot postion [row = ${position.row}, column = ${position.column}, facing = ${position.facing}}]`);
            return true;
        }
        return false;
    }

    getPosition(): Position | undefined {
        return this.position;
    }

    rotateLeft(): void {
        if (!this.position) {
            return;
        }
        const facingIndex = this.directions.findIndex((item) => this.position?.facing === item);
        const newFacingIndex = (facingIndex - 1) < 0 ? this.directions.length - 1 : facingIndex - 1;
        this.updatePosition({
            ... this.position,
            facing: this.directions[newFacingIndex]
        });
    }

    rotateRight(): void {
        if (!this.position) {
            return;
        }
        const facingIndex = this.directions.findIndex((item) => this.position?.facing === item);
        const newFacingIndex = (facingIndex + 1) === this.directions.length ? 0 : facingIndex + 1;
        this.updatePosition({
            ... this.position,
            facing: this.directions[newFacingIndex]
        });
    }

    move(): boolean {
        if (!this.position) {
            return false;
        }
        let newPosition;
        switch (this.position.facing) {
            case Direction.NORTH: newPosition = { ...this.position, row: this.position.row + 1 }
                break;

            case Direction.EAST: newPosition = { ...this.position, column: this.position.column + 1 }
                break;

            case Direction.SOUTH: newPosition = { ...this.position, row: this.position.row - 1 }
                break;

            case Direction.WEST: newPosition = { ...this.position, column: this.position.column - 1 }
                break;
        }

        return this.updatePosition(newPosition);
    }

    /**
     * Object orinented boilerplate
     */
    dummy() { }

}

export { IRobot, Robot };