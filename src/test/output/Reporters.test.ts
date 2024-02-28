import { Writable } from "stream";
import { ConsoleReporter } from "../../app/output/Reporter";
import { Direction, Position } from "../../app/model/Model";

describe('Reporter test suite', () => {

    describe('Console Reporter', () => {

        const EMPTY_BOARD = 'Output: Robot has not been palced on the board\n';
        let reporter: ConsoleReporter;
        let bucket: string[];
        let mockWritebale: Writable;

        beforeEach(() => {
            bucket = [];
            mockWritebale = {
                write: (msg: string) => bucket.push(msg) > 0
            } as Writable;
            reporter = new ConsoleReporter(mockWritebale);
        })

        afterEach(() => {
            jest.clearAllMocks();
        })

        it('should write a message when position is undefinde', () => {
            reporter.report(undefined);

            expect(bucket).toContain(EMPTY_BOARD);
            expect(bucket.length).toBe(1);
        })

        it('should write position', () => {
            reporter.report(new Position(2,3,Direction.SOUTH));

            expect(bucket).toContain('Output: 3,2,SOUTH\n');
            expect(bucket.length).toBe(1);
        })
    })
})