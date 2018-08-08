/* eslint no-undef: 0 */
import { a, fetchData, fetchData2 } from '../../src/container/demo/demo-action';

test('Test function a', () => {
    expect(a(1, 2)).toBe(3);
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
