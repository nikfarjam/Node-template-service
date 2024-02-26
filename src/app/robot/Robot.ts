import { IPositionValidator } from "../board/Board";
import { Direction, Position } from "../model/Model";

interface IRobot {
    getPosition(): Position;

    rotateLeft(): void;

    rotateRight(): void;

    move(): boolean;

    dummy(): void;
}

class Robot implements IRobot {

    private position: Position;
    private validator: IPositionValidator;
    private directions: Direction[];

    constructor(position: Position, validator: IPositionValidator) {
        this.position = position;
        this.validator = validator;
        this.directions = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];
    }

    getPosition(): Position {
        return this.position;
    }

    rotateLeft(): void {
        const facingIndex = this.directions.findIndex((item) => this.position.getFacing() === item);
        const newFacingIndex = (facingIndex - 1) < 0 ? this.directions.length - 1 : facingIndex - 1;
        this.position = new Position(this.position.getRow(), this.position.getColumn(), this.directions[newFacingIndex]);
    }

    rotateRight(): void {
        const facingIndex = this.directions.findIndex((item) => this.position.getFacing() === item);
        const newFacingIndex = (facingIndex + 1) === this.directions.length ? 0 : facingIndex + 1;
        this.position = new Position(this.position.getRow(), this.position.getColumn(), this.directions[newFacingIndex]);
    }

    move(): boolean {
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

        if (newPosition && this.validator.isAllowed(newPosition)) {
            this.position = newPosition;
            return true;
        }
        return false;

    }

    /* istanbul ignore next */
    dummy(): void { }

}

export { IRobot, Robot };