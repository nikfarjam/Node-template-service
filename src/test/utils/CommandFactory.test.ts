import { LeftCommand, MoveCommand, PlaceCommand, ReportCommand, RightCommand } from '../../app/command/Command';
import { createCommandOrUndefined } from '../../app/utils/CommandFactory';
import { Direction, Position } from '../../app/model/Model';

describe('Command Factory test suite', () => {

    const moveCommand = new MoveCommand();
    const leftCommand = new LeftCommand();
    const rightCommand = new RightCommand();
    const reportCommand = new ReportCommand();

    it.each([
        { input: 'move', expected: moveCommand },
        { input: 'MOVE', expected: moveCommand },
        { input: ' MOVE', expected: moveCommand },

        { input: 'left', expected: leftCommand },
        { input: 'LEFT', expected: leftCommand },
        { input: ' LEFT', expected: leftCommand },

        { input: 'right', expected: rightCommand },
        { input: 'RIGHT', expected: rightCommand },
        { input: ' RIGHT', expected: rightCommand },


        { input: 'report', expected: reportCommand },
        { input: 'REPORT', expected: reportCommand },
        { input: ' REPORT', expected: reportCommand }

    ])('createCommandOrUndefined of $input should be instance of $expected', ({ input, expected }) => {
        const actual = createCommandOrUndefined(input);

        expect(actual).toStrictEqual(expected);
    });

    it.each([
        { input: 'PLACE 0,0,NORTH', expected: new PlaceCommand(new Position(0, 0, Direction.NORTH)) },
        { input: 'PLACE 2,3,EAST', expected: new PlaceCommand(new Position(3, 2, Direction.EAST)) },
        { input: 'place 2,3,west', expected: new PlaceCommand(new Position(3, 2, Direction.WEST)) },
        { input: ' PLACE   2 , 3 , EAST ', expected: new PlaceCommand(new Position(3, 2, Direction.EAST)) },
        { input: 'PLACE 1,2,NORTH', expected: new PlaceCommand(new Position(2, 1, Direction.NORTH)) },

    ])('createCommandOrUndefined of "$input" should be instance of $expected', ({ input, expected }) => {
        const actual = createCommandOrUndefined(input);

        expect(actual).toStrictEqual(expected);
    });

    it.each([
        { input: 'move1' },
        { input: 'test' },
        { input: 'place,a,b' },
        { input: 'place,1.2,3.14' },
        { input: '#' },
        { input: 'PLACE -1,-4,SOUTH' },

    ])('createCommandOrUndefined should return undefined for $input', ({ input }) => {
        const actual = createCommandOrUndefined(input);

        expect(actual).toBeUndefined();
    });
})
