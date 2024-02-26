import { IPositionValidator } from '../../app/board/Board';
import { Direction, Position } from '../../app/model/Model';
import { Robot } from '../../app/robot/Robot';

describe('Robot test suite', () => {

    let mockValidator: IPositionValidator;

    beforeEach(() => {
        mockValidator = {
            isAllowed: () => true
        };
    });

    it('should report position', () => {
        const position = new Position(1, 3, Direction.EAST);
        const robot = new Robot(position, mockValidator);

        expect(robot.getPosition()).toStrictEqual(position);
    })

    it('should rotate left', () => {
        const position = new Position(1, 3, Direction.EAST);
        const robot = new Robot(position, mockValidator);

        expect(robot.getPosition().getFacing()).toBe(Direction.EAST);
        robot.rotateLeft();
        expect(robot.getPosition().getFacing()).toBe(Direction.NORTH);
        robot.rotateLeft();
        expect(robot.getPosition().getFacing()).toBe(Direction.WEST);
        robot.rotateLeft();
        expect(robot.getPosition().getFacing()).toBe(Direction.SOUTH);
        robot.rotateLeft();
        expect(robot.getPosition().getFacing()).toBe(Direction.EAST);
    })

    it('should rotate right', () => {
        const position = new Position(1, 3, Direction.EAST);
        const robot = new Robot(position, mockValidator);

        expect(robot.getPosition().getFacing()).toBe(Direction.EAST);
        robot.rotateRight();
        expect(robot.getPosition().getFacing()).toBe(Direction.SOUTH);
        robot.rotateRight();
        expect(robot.getPosition().getFacing()).toBe(Direction.WEST);
        robot.rotateRight();
        expect(robot.getPosition().getFacing()).toBe(Direction.NORTH);
        robot.rotateRight();
        expect(robot.getPosition().getFacing()).toBe(Direction.EAST);
    })

    it.each([
        { input: new Position(1, 3, Direction.EAST), expected: new Position(1, 4, Direction.EAST) },
        { input: new Position(1, 3, Direction.WEST), expected: new Position(1, 2, Direction.WEST) },
        { input: new Position(1, 3, Direction.NORTH), expected: new Position(2, 3, Direction.NORTH) },
        { input: new Position(1, 3, Direction.SOUTH), expected: new Position(0, 3, Direction.SOUTH) },

    ])('Robot at $input must move to $expected when new position is allowed', ({ input, expected }) => {
        const robot = new Robot(input, mockValidator);

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
            isAllowed: () => false
        };
        const robot = new Robot(input, mockValidator);

        const actual = robot.move();

        expect(actual).toBeFalsy();
        expect(robot.getPosition()).toStrictEqual(input);
    });

});