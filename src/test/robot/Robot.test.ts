import { IPositionValidator } from '../../app/board/Board';
import { Direction, Position } from '../../app/model/Model';
import { Robot } from '../../app/robot/Robot';

describe('Robot test suite', () => {

    let mockValidator: IPositionValidator;
    let robot: Robot;

    beforeEach(() => {
        mockValidator = {
            isAllowed: () => true,
            addRobot: () => true
        };
        robot = new Robot(mockValidator);
    });

    it('should report position', () => {
        const position = { row: 3, column: 1, facing: Direction.EAST };
        robot.place(position);

        expect(robot.getPosition()).toStrictEqual(position);
    })

    it('should rotate left', () => {
        const position = { row: 1, column: 3, facing: Direction.EAST };
        robot.place(position);

        expect(robot.getPosition()).toBeDefined();
        expect(robot.getPosition()?.facing).toBe(Direction.EAST);
        robot.rotateLeft();
        expect(robot.getPosition()?.facing).toBe(Direction.NORTH);
        robot.rotateLeft();
        expect(robot.getPosition()?.facing).toBe(Direction.WEST);
        robot.rotateLeft();
        expect(robot.getPosition()?.facing).toBe(Direction.SOUTH);
        robot.rotateLeft();
        expect(robot.getPosition()?.facing).toBe(Direction.EAST);
    })

    it('should rotate right', () => {
        const position = { row: 3, column: 1, facing: Direction.EAST };
        robot.place(position);

        expect(robot.getPosition()).toBeDefined();
        expect(robot.getPosition()?.facing).toBe(Direction.EAST);
        robot.rotateRight();
        expect(robot.getPosition()?.facing).toBe(Direction.SOUTH);
        robot.rotateRight();
        expect(robot.getPosition()?.facing).toBe(Direction.WEST);
        robot.rotateRight();
        expect(robot.getPosition()?.facing).toBe(Direction.NORTH);
        robot.rotateRight();
        expect(robot.getPosition()?.facing).toBe(Direction.EAST);
    })

    it.each([
        { input: { row: 3, column: 1, facing: Direction.EAST }, expected: { row: 3, column: 2, facing: Direction.EAST } },
        { input: { row: 3, column: 1, facing: Direction.WEST }, expected: { row: 3, column: 0, facing: Direction.WEST } },
        { input: { row: 3, column: 1, facing: Direction.NORTH }, expected: { row: 4, column: 1, facing: Direction.NORTH } },
        { input: { row: 3, column: 1, facing: Direction.SOUTH }, expected: { row: 2, column: 1, facing: Direction.SOUTH } },

    ])('Robot at $input must move to $expected when new position is allowed', ({ input, expected }) => {
        robot.place(input);

        const actual = robot.move();

        expect(actual).toBeTruthy();
        expect(robot.getPosition()).toStrictEqual(expected);
    });

    it.each([
        { input: { row: 3, column: 1, facing: Direction.EAST } },
        { input: { row: 3, column: 1, facing: Direction.WEST } },
        { input: { row: 3, column: 1, facing: Direction.NORTH } },
        { input: { row: 3, column: 1, facing: Direction.SOUTH } },

    ])('Robot at $input must stop when new position is NOT allowed', ({ input }) => {
        mockValidator = {
            isAllowed: (p: Position) => p === input,
            addRobot: () => true
        };
        const robot = new Robot(mockValidator);
        robot.place(input);

        const actual = robot.move();

        expect(actual).toBeFalsy();
        expect(robot.getPosition()).toStrictEqual(input);
    });

    it('should ignore commands before placeing in a position', () => {
        expect(robot.move()).toBeFalsy();
        expect(robot.rotateLeft()).toBeFalsy();
        expect(robot.rotateRight()).toBeFalsy();
        expect(robot.getPosition()).toBeFalsy();
    })

    it('should support mulitiple place', () => {
        let position = { row: 2, column: 1, facing: Direction.NORTH };

        expect(robot.place(position)).toBeTruthy();
        expect(robot.getPosition()).toStrictEqual(position);

        position = { row: 4, column: 3, facing: Direction.EAST };

        expect(robot.place(position)).toBeTruthy();
        expect(robot.getPosition()).toStrictEqual(position);

        position = { row: 20, column: 10, facing: Direction.WEST };

        expect(robot.place(position)).toBeTruthy();
        expect(robot.getPosition()).toStrictEqual(position);

        position = { row: 23, column: 20, facing: Direction.SOUTH };

        expect(robot.place(position)).toBeTruthy();
        expect(robot.getPosition()).toStrictEqual(position);
    })

});