/* eslint no-undef: 0 */
import { a, fetchData, fetchData2, subtraction } from '../../src/container/demo/demo-action';

describe('this is a demo', () => {
    let x = 1;
    let y = 2;
    beforeEach(() => {
        x = 1;
        y = 2;
    });
    afterEach(() => {
        console.log('after each');
    });
    test('Test function a', () => {
        expect(a(x, y)).toBe(3);
        x = 4;
    });
    test('substraction 1 - 2', () => {
        expect(subtraction(x, y)).toBe(-1);
    });
    test('test fetch data', (done) => {
        fetchData((res) => {
            expect(res).toBe(2);
            done();
        });
    });
    test('test fetch data 2', () => {
        expect.assertions(1);
        return fetchData2().then((res) => {
            expect(res).toBe(3);
        });
    });
});
