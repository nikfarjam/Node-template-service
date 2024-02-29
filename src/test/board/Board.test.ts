
import { Board, IBoard } from '../../app/board/Board';
import { LeftCommand, MoveCommand, PlaceCommand, ReportCommand, RightCommand } from '../../app/command/Command';
import { Direction, Position } from '../../app/model/Model';
import { IRobot, Robot } from '../../app/robot/Robot';

describe('Board test suite', () => {

    describe('Board', () => {

        it('should throw error when number of rows is negetive', () => {
            function expectError() {
                new Board(-1, 10);
            }
            expect(expectError).toThrow();
        })

        it('should throw error when number of rows is NaN', () => {
            function expectError() {
                new Board(Number.NaN, 10);
            }
            expect(expectError).toThrow();
        })

        it('should throw error when number of columns is negetive', () => {
            function expectError() {
                new Board(10, -5);
            }
            expect(expectError).toThrow();
        })

        it('should throw error when number of columns is NaN', () => {
            function expectError() {
                new Board(10, NaN);
            }
            expect(expectError).toThrow();
        })

        it('should NOT throw error when number of rows and columns are positive', () => {
            new Board(2, 3);
        })

        it('should have only and only one robot', () => {
            const board = new Board(2, 3);
            const firstRobot: IRobot = {} as IRobot;
            const secondRobot: IRobot = {} as IRobot;

            expect(board.addRobot(firstRobot)).toBeTruthy();
            expect(board.addRobot(secondRobot)).toBeFalsy();
        })
    })

    describe('Is allowed position', () => {
        const rows = 3;
        const columns = 4;
        let board: IBoard;

        beforeEach(() => {
            board = new Board(rows, columns);
        })

        it('should allow position whem row is less than rows of the board', () => {
            for (let i = 0; i < rows; i++) {
                expect(board.isAllowed({ row: i, column: 2, facing: Direction.NORTH })).toBeTruthy();
            }
        })

        it('should NOT allow position whem row is more than rows of the board', () => {
            expect(board.isAllowed({ column: 3, row: -1, facing: Direction.NORTH })).toBeFalsy();
            expect(board.isAllowed({ column: 2, row: rows, facing: Direction.NORTH })).toBeFalsy();
        })

        it('should allow position whem coulmn is less than columns of the board', () => {
            for (let i = 0; i < columns; i++) {
                expect(board.isAllowed({ column: i, row: 1, facing: Direction.NORTH })).toBeTruthy();
            }
        })

        it('should NOT allow position whem coulmn is more than columns of the board', () => {
            expect(board.isAllowed({ column: -1, row: 1, facing: Direction.NORTH })).toBeFalsy();
            expect(board.isAllowed({ column: columns, row: 1, facing: Direction.NORTH })).toBeFalsy();
        })

    })

    describe('Place command', () => {

        const rows = 3;
        const columns = 4;
        let board: IBoard;

        beforeEach(() => {
            board = new Board(rows, columns);
            new Robot(board);
        })

        it('should have no robot at the begning', () => {
            expect(board.getRobotPosition()).toBeUndefined();
        })

        it('should NOT add robot when place command is NOT allowed', () => {
            const initPosition = { row: rows, column: columns, facing: Direction.EAST };

            const success = board.runCommand(new PlaceCommand(initPosition));

            expect(success).toBeFalsy();
            expect(board.getRobotPosition()).toBeUndefined();
        })

        it('should support multiple PLACE commands', () => {
            let newPosition = { row: 1, column: 1, facing: Direction.NORTH };
            let success = board.runCommand(new PlaceCommand(newPosition));

            expect(success).toBeTruthy();
            expect(board.getRobotPosition()).toStrictEqual(newPosition);

            newPosition = { column: 3, row: 2, facing: Direction.SOUTH };
            success = board.runCommand(new PlaceCommand(newPosition));

            expect(success).toBeTruthy();
            expect(board.getRobotPosition()).toStrictEqual(newPosition);
        })

    })

    describe('Robot commands', () => {
        const rows = 3;
        const columns = 4;
        let initPosition: Position;
        let board: IBoard;

        beforeEach(() => {
            board = new Board(rows, columns);
            new Robot(board);
            initPosition = { row: 2, column: 1, facing: Direction.EAST };
            board.runCommand(new PlaceCommand(initPosition));
        })

        it('RIGHT should push robot to rotate right', () => {
            const success = board.runCommand(new LeftCommand());

            expect(success).toBeTruthy();
            expect(board.getRobotPosition()).toStrictEqual({ row: 2, column: 1, facing: Direction.NORTH });
        })

        it('RIGHT should push robot to rotate right', () => {
            const success = board.runCommand(new RightCommand());

            expect(success).toBeTruthy();
            expect(board.getRobotPosition()).toStrictEqual({ row: 2, column: 1, facing: Direction.SOUTH });
        })

        it('MOVE should push robot to move forward', () => {
            const success = board.runCommand(new MoveCommand());

            expect(success).toBeTruthy();
            expect(board.getRobotPosition()).toStrictEqual({ row: 2, column: 2, facing: Direction.EAST });
        })

        it('should ignore commands until the first PLACE command', () => {
            board = new Board(rows, columns);
            new Robot(board);

            expect(board.runCommand(new MoveCommand())).toBeFalsy();
            expect(board.runCommand(new LeftCommand())).toBeFalsy();
            expect(board.runCommand(new RightCommand())).toBeFalsy();
            expect(board.runCommand(new MoveCommand())).toBeFalsy();
            expect(board.runCommand(new ReportCommand())).toBeFalsy();

            expect(board.runCommand(new PlaceCommand(initPosition))).toBeTruthy();
        })

    })

    describe('Invalid commands and edge senarios', () => {

        const rows = 2;
        const columns = 3;
        let initPosition: Position;
        let board: IBoard;

        beforeEach(() => {
            board = new Board(rows, columns);
            new Robot(board);
            initPosition = { row: 1, column: 2, facing: Direction.EAST };
            board.runCommand(new PlaceCommand(initPosition));
        })

        it('should NOT move robot out of board', () => {
            initPosition = { row: 1, column: 2, facing: Direction.EAST };
            board.runCommand(new PlaceCommand(initPosition));
            const success = board.runCommand(new MoveCommand());

            expect(success).toBeFalsy();
            expect(board.getRobotPosition()).toStrictEqual(initPosition);
        })

        it('should ignore LEFT, RIGHT and MOVE commands, before the first PLACE', () => {
            board = new Board(rows, columns);

            expect(board.runCommand(new MoveCommand())).toBeFalsy();
            expect(board.runCommand(new RightCommand())).toBeFalsy();
            expect(board.runCommand(new LeftCommand())).toBeFalsy();
            expect(board.getRobotPosition()).toBeUndefined();
        })

        it('should ignore REPORT commands', () => {
            expect(board.runCommand(new ReportCommand())).toBeFalsy();
            expect(board.getRobotPosition()).toStrictEqual(initPosition);
        })

    })

});