
import {Board} from '../../app/board/Board';

describe('Board test suite', () => {

    it('should throw error when number of rows is negetive', ()=> {
        function expectError() {
            new Board(-1, 10);
        }
        expect(expectError).toThrow();
    })

    it('should throw error when number of columns is negetive', ()=> {
        function expectError() {
            new Board(10, -5);
        }
        expect(expectError).toThrow();
    })

    it('should NOT throw error when number of rows and columns are positive', ()=> {
        new Board(2,3);
    })
});