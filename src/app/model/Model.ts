class Position {
    private row: number;
    private column: number;
    private facing: Direction;

    constructor(row: number, column: number, facing: Direction) {
        this.row = row;
        this.column = column;
        this.facing = facing;
    }

    getRow(): number {
        return this.row;
    }

    getColumn(): number {
        return this.column;
    }

    getFacing(): Direction {
        return this.facing;
    }

}

enum Direction {
    NORTH = 'NORTH',
    SOUTH = 'SOUTH',
    EAST = 'EAST',
    WEST = 'WEST'
}

enum Rotate {
    LEFT,
    RIGHT
}

export { Position, Direction, Rotate };