import { LeftCommand, MoveCommand, RightCommand } from '../../app/command/Command';
import { Direction, Position } from '../../app/model/Model';
import { IRobot } from '../../app/robot/Robot';

describe('Command test suite', () => {

    let mockRobot: IRobot;

    beforeEach(() => {
        mockRobot = {
            rotateLeft: jest.fn(),
            getPosition: jest.fn().mockReturnValue({ column: 2, row: 3, facing: Direction.NORTH }),
            rotateRight: jest.fn(),
            move: jest.fn().mockReturnValue(true),
            place: jest.fn(),
            dummy: () => { }
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('Left Command', () => {

        it('should execute robot rotate left', () => {
            const leftCommand = new LeftCommand();

            const actual = leftCommand.execute(mockRobot);

            expect(actual).toBe(true);
            expect(mockRobot.rotateLeft).toHaveBeenCalledTimes(1);
        })
    })

    describe('Right Command', () => {
        it('should execute robot rotate right', () => {
            const rightCommand = new RightCommand();

            const actual = rightCommand.execute(mockRobot);

            expect(actual).toBe(true);
            expect(mockRobot.rotateRight).toHaveBeenCalledTimes(1);
        })
    })

    describe('Move Command', () => {
        it('should execute robot move', () => {
            const moveCommand = new MoveCommand();

            const actual = moveCommand.execute(mockRobot);

            expect(actual).toBe(true);
            expect(mockRobot.move).toHaveBeenCalledTimes(1);
        })
    })
})