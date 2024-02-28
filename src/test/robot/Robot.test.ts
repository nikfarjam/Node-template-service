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
        const position = new Position(1, 3, Direction.EAST);
        robot.place(position);

        expect(robot.getPosition()).toStrictEqual(position);
    })

    it('should rotate left', () => {
        const position = new Position(1, 3, Direction.EAST);
        robot.place(position);

        expect(robot.getPosition()).toBeDefined();
        expect(robot.getPosition()?.getFacing()).toBe(Direction.EAST);
        robot.rotateLeft();
        expect(robot.getPosition()?.getFacing()).toBe(Direction.NORTH);
        robot.rotateLeft();
        expect(robot.getPosition()?.getFacing()).toBe(Direction.WEST);
        robot.rotateLeft();
        expect(robot.getPosition()?.getFacing()).toBe(Direction.SOUTH);
        robot.rotateLeft();
        expect(robot.getPosition()?.getFacing()).toBe(Direction.EAST);
    })

    it('should rotate right', () => {
        const position = new Position(1, 3, Direction.EAST);
        robot.place(position);

        expect(robot.getPosition()).toBeDefined();
        expect(robot.getPosition()?.getFacing()).toBe(Direction.EAST);
        robot.rotateRight();
        expect(robot.getPosition()?.getFacing()).toBe(Direction.SOUTH);
        robot.rotateRight();
        expect(robot.getPosition()?.getFacing()).toBe(Direction.WEST);
        robot.rotateRight();
        expect(robot.getPosition()?.getFacing()).toBe(Direction.NORTH);
        robot.rotateRight();
        expect(robot.getPosition()?.getFacing()).toBe(Direction.EAST);
    })

    it.each([
        { input: new Position(1, 3, Direction.EAST), expected: new Position(1, 4, Direction.EAST) },
        { input: new Position(1, 3, Direction.WEST), expected: new Position(1, 2, Direction.WEST) },
        { input: new Position(1, 3, Direction.NORTH), expected: new Position(2, 3, Direction.NORTH) },
        { input: new Position(1, 3, Direction.SOUTH), expected: new Position(0, 3, Direction.SOUTH) },

    ])('Robot at $input must move to $expected when new position is allowed', ({ input, expected }) => {
        robot.place(input);

        const actual = robot.move();

        expect(actual).toBeTruthy();
        expect(robot.getPosition()).toStrictEqual(expected);
    });

    it.each([
        { input: new Position(1, 3, Direction.EAST) },
        { input: new Position(1, 3, Direction.WEST) },
        { input: new Position(1, 3, Direction.NORTH) },
        { input: new Position(1, 3, Direction.SOUTH) },

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
        let position = new Position(1, 2, Direction.NORTH);

        expect(robot.place(position)).toBeTruthy();
        expect(robot.getPosition()).toStrictEqual(position);

        position = new Position(3, 4, Direction.EAST);

        expect(robot.place(position)).toBeTruthy();
        expect(robot.getPosition()).toStrictEqual(position);

        position = new Position(10, 20, Direction.WEST);

        expect(robot.place(position)).toBeTruthy();
        expect(robot.getPosition()).toStrictEqual(position);

        position = new Position(23, 20, Direction.SOUTH);

        expect(robot.place(position)).toBeTruthy();
        expect(robot.getPosition()).toStrictEqual(position);
    })

});