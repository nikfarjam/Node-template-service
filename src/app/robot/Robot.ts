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
            debug(`Robot postion [row = ${position.getRow()}, column = ${position.getColumn()}, facing = ${position.getFacing()}}]`);
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
        const facingIndex = this.directions.findIndex((item) => this.position?.getFacing() === item);
        const newFacingIndex = (facingIndex - 1) < 0 ? this.directions.length - 1 : facingIndex - 1;
        this.updatePosition(new Position(this.position.getRow(), this.position.getColumn(), this.directions[newFacingIndex]));
    }

    rotateRight(): void {
        if (!this.position) {
            return;
        }
        const facingIndex = this.directions.findIndex((item) => this.position?.getFacing() === item);
        const newFacingIndex = (facingIndex + 1) === this.directions.length ? 0 : facingIndex + 1;
        this.updatePosition(new Position(this.position.getRow(), this.position.getColumn(), this.directions[newFacingIndex]));
    }

    move(): boolean {
        if (!this.position) {
            return false;
        }
        let newPosition;
        switch (this.position.getFacing()) {
            case Direction.NORTH: newPosition = new Position(
                this.position.getRow() + 1,
                this.position.getColumn(),
                this.position.getFacing());
                break;

            case Direction.EAST: newPosition = new Position(
                this.position.getRow(),
                this.position.getColumn() + 1,
                this.position.getFacing());
                break;

            case Direction.SOUTH: newPosition = new Position(
                this.position.getRow() - 1,
                this.position.getColumn(),
                this.position.getFacing());
                break;

            case Direction.WEST: newPosition = new Position(
                this.position.getRow(),
                this.position.getColumn() - 1,
                this.position.getFacing());
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