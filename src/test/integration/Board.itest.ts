import { PassThrough } from "stream";
import App from "../../app/App";
import { Board, IBoard } from "../../app/board/Board";
import { fileReader } from "../../app/input/CommandReader";
import { ConsoleReporter } from "../../app/output/Reporter";
import { Robot } from "../../app/robot/Robot";

describe('Integration tests', () => {

    function setUp(columns: number, rows: number, filePath: string, output: string[]): App {
        const board: IBoard = new Board(rows, columns);
        new Robot(board);
        const cammandStream = fileReader(filePath);
        const mockedStream = new PassThrough();
        mockedStream.on('data', (msg: string) => {
            output.push(msg.toString());
        });
        const reporters = [new ConsoleReporter(mockedStream)];

        return new App(board, cammandStream, reporters);
    }

    it('should pass sample1.txt', async () => {
        const result: string[] = [];
        const app = setUp(5, 5, 'src/test/integration/test-inputs/sample1.txt', result);

        await app.runBoard();

        expect(result.length).toBe(1);
        expect(result[0]).toContain('Output: 3,3,NORTH');
    })

    it('should pass sample2.txt', async () => {
        const result: string[] = [];
        const app = setUp(5, 5, 'src/test/integration/test-inputs/sample2.txt', result);

        await app.runBoard();

        expect(result.length).toBe(6);
        expect(result[0]).toContain('Output: Robot has not been palced on the board\n');
        expect(result[1]).toContain('Output: Robot has not been palced on the board\n');
        expect(result[2]).toContain('Output: 3,2,NORTH');
        expect(result[3]).toContain('Output: 3,3,EAST');
        expect(result[4]).toContain('Output: 3,3,EAST');
        expect(result[5]).toContain('Output: 4,3,SOUTH');
    })

    it('should pass sample3.txt', async () => {
        const result: string[] = [];
        const app = setUp(5, 5, 'src/test/integration/test-inputs/sample3.txt', result);

        await app.runBoard();

        expect(result.length).toBe(4);
        expect(result[0]).toContain('Output: 4,2,NORTH');
        expect(result[1]).toContain('Output: 4,3,WEST');
        expect(result[2]).toContain('Output: 3,3,SOUTH');
        expect(result[3]).toContain('Output: 3,2,EAST');
    })

    describe('Handle errors', () => {

        it('should handle not exist file', () => {
            expect(() => {
                setUp(5, 5, '343', []);
            }).toThrow();
        })

        it('should handle empty file path', async () => {
            const result: string[] = [];
            const app = setUp(5, 5, '', []);
            app.runBoard();

            expect(result.length).toBe(0);
        })

        it('should handle invalid number of coulmns', () => {
            expect(() => {
                setUp(NaN, 5, 'src/test/integration/test-inputs/sample3.txt', []);
            }).toThrow();
        })

        it('should handle invalid number of rows', () => {
            expect(() => {
                setUp(5, NaN, 'src/test/integration/test-inputs/sample3.txt', []);
            }).toThrow();
        })
    })

})