import { LeftCommand, MoveCommand, PlaceCommand, ReportCommand, RightCommand } from '../../app/command/Command';
import { createCommandOrUndefined } from '../../app/command/CommandFactory';
import { Direction, Position } from '../../app/model/Model';

describe('Command Factory test suite', () => {

    it.each([
        { input: 'move', expected: new MoveCommand() },
        { input: 'MOVE', expected: new MoveCommand() },
        { input: ' MOVE', expected: new MoveCommand() },

        { input: 'left', expected: new LeftCommand() },
        { input: 'LEFT', expected: new LeftCommand() },
        { input: ' LEFT', expected: new LeftCommand() },

        { input: 'right', expected: new RightCommand() },
        { input: 'RIGHT', expected: new RightCommand() },
        { input: ' RIGHT', expected: new RightCommand() },


        { input: 'report', expected: new ReportCommand() },
        { input: 'REPORT', expected: new ReportCommand() },
        { input: ' REPORT', expected: new ReportCommand() }

    ])('$input createCommandOrUndefined should be instance of $expected', ({ input, expected }) => {
        const actual = createCommandOrUndefined(input);

        expect(actual).toStrictEqual(expected);
    });

    it.skip.each([
        { input: 'PLACE 0,0,NORTH', expected: new PlaceCommand(new Position(0,0,Direction.NORTH)) },
        { input: 'PLACE 2,3,EAST', expected: new PlaceCommand(new Position(2,3,Direction.EAST)) },
        { input: 'place 2,3,west', expected: new PlaceCommand(new Position(2,3,Direction.WEST)) },
        { input: 'PLACE -1,-4,SOUTH', expected: new PlaceCommand(new Position(-1,-4,Direction.SOUTH)) },
        { input: ' PLACE   2 , 3 , EAST ', expected: new PlaceCommand(new Position(2,3,Direction.EAST)) },
        { input: 'PLACE 1,2,NORTH', expected: new PlaceCommand(new Position(1,2,Direction.NORTH)) },

    
    ])('"$input" createCommandOrUndefined should be instance of $expected', ({ input, expected }) => {
        const actual = createCommandOrUndefined(input);

        expect(actual).not.toBeUndefined();
        // expect((actual as PlaceCommand).getPosition()).toStrictEqual(expected.getPosition());
        // expect(actual).toStrictEqual(expected);
    });

    it.each([
        { input: 'move1'},
        { input: 'test'},
        { input: 'place,a,b'},
        { input: '#'},

    ])('createCommandOrUndefined should return undefined for $input', ( {input} ) => {
        const actual = createCommandOrUndefined(input);

        expect(actual).toBeUndefined();
    });
})
