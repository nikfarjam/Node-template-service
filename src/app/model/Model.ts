interface Position {
    readonly column: number;
    readonly row: number;
    readonly facing: Direction;
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