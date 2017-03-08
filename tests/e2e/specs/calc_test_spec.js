'use strict';

require('./../utils/calc_page.js');

describe('Calc test - spec', function () {
    var calculator = new global.auto.pages.Calculator();

    beforeAll(function(){
        calculator.get();
    });

    it('Validate expression: 1 + 5 = 6 ', function () {
        calculator.calculate('1', '+', '5');
        expect(calculator.getResult()).toEqual('6');
    });

    it('Validate expression: 7 + (-3) = 4 ', function () {
        calculator.calculate('7', '+', '-3');
        expect(calculator.getResult()).toEqual('4');
    });

    it('Validate expression: (-10) + 7 = -3 ', function () {
        calculator.calculate('-10', '+', '7');
        expect(calculator.getResult()).toEqual('-3');
    });

    it('Validate expression: (-100) + (-17) = –117 ', function () {
        calculator.calculate('-100', '+', '-17');
        expect(calculator.getResult()).toEqual('-117');
    });

    it('Validate expression: (-117) + 117 = 0 ', function () {
        calculator.calculate('-117', '+', '117');
        expect(calculator.getResult()).toEqual('0');

    });

    it('Validate expression: (-23) + 0 = -23 ', function () {
        calculator.calculate('-23', '+', '0');
        expect(calculator.getResult()).toEqual('-23');

    });

    it('Validate expression: 1.1 + 5.1 = 6.2 ', function () {
        calculator.calculate('1.1', '+', '5.1');
        expect(calculator.getResult()).toEqual('6.2');

    });

    it('Validate expression: 7.12 + (-3.11) = 4.01 ', function () {
        calculator.calculate('7.12', '+', '-3.11');
        expect(calculator.getResult()).toEqual('4.01');
    });

    it('Validate expression: 2 * 2 = 4 ', function () {
        calculator.calculate('2', '*', '2');
        expect(calculator.getResult()).toEqual('4');
    });

});

