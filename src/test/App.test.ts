import { Readable } from "stream";
import App from "../app/App";
import { Board, IBoard } from "../app/board/Board";
import { Robot } from "../app/robot/Robot";
import { IReporter } from "../app/output/Reporter";
import { Position } from "../app/model/Model";

describe('App suit tests', () => {

    describe('invalid inputs', () => {
        const rows = 5;
        const columns = 5;
        let board: IBoard;
        let app: App;
        let mockReporter: TestReporter;

        beforeEach(() => {
            board = new Board(rows, columns);
            new Robot(board);
            mockReporter = new TestReporter();
        })

        it.each([
            { input: [] },
            { input: [''] },
            { input: ['TEST'] },
            { input: ['PLACE 2,3,NORTH'] },
            { input: ['LEFT'] },
            { input: ['LEFT', 'REPORT'] },
            { input: ['PLACE 5,5,WEST', 'REPORT'] },

        ])('should report nothing for $input', async ({ input }) => {
            app = new App(board, Readable.from(input), [mockReporter]);

            await app.runBoard();

            expect(mockReporter.getResult().length).toBe(0);
        });

    })

    describe('Edge scenarios', () => {
        const rows = 5;
        const columns = 5;
        let board: IBoard;
        let app: App;
        let mockReporter: TestReporter;

        beforeEach(() => {
            board = new Board(rows, columns);
            new Robot(board);
            mockReporter = new TestReporter();
        })

        it.each([
            { input: ['PLACE 1,2,NORTH', 'REPORT'], expected: ['1,2,NORTH'] },
            { input: ['LEFT', 'PLACE 1,2,NORTH', 'REPORT'], expected: ['1,2,NORTH'] },
            { input: ['PLACE 1,2,NORTH', 'REPORT', 'REPORT'], expected: ['1,2,NORTH', '1,2,NORTH'] },
            { input: ['PLACE 1,2,SOUTH', 'PLACE 3,4,NORTH', 'PLACE 5,5,WEST', 'REPORT'], expected: ['3,4,NORTH'] },
            { input: ['LEFT', 'PLACE 1,2,NORTH', 'TEST', 'MOVE', 'REPORT'], expected: ['1,3,NORTH'] }

        ])('should report $expected for $input', async ({ input, expected }) => {
            app = new App(board, Readable.from(input), [mockReporter]);

            await app.runBoard();

            expect(mockReporter.getResult().length).toBe(expected.length);
            for (let i = 0; i < expected.length; i++) {
                expect(mockReporter.getResult()[i]).toStrictEqual(expected[i]);
            }
        });

    })

    class TestReporter implements IReporter {
        private bucket: string[]

        constructor() {
            this.bucket = [];
        }

        getResult(): string[] {
            return this.bucket;
        }

        report(position: Position) {
            if (position) {
                this.bucket.push(`${position.column},${position.row},${position.facing}`);
            }
        }
    }
})