'use strict';

function Calculator(){
    //Properties:
    this.url = browser.params.baseUrl;
    this.valueA = element(by.model('first'));
    this.operator = element(by.model('operator'));
    this.valueB = element(by.model('second'));
    this.button = element(by.id('gobutton'));
    this.result = element(by.css('h2.ng-binding'));

    //Methods:
    //method navigates browser to calc page
    this.get = function(){
        browser.get(this.url);
    };

    //method sets values and operator and then click button to calculate expression
    this.calculate = function(valueA, operator, valueB){
        this.valueA.sendKeys(valueA);
        this.operator.sendKeys(operator);
        this.valueB.sendKeys(valueB);
        this.button.click();
    };

    //method returns a promise to get text of result field
    this.getResult = function(){
        return this.result.getText();
    };
}

//Define global objects
global.auto = global.auto || {};
global.auto.pages = global.auto.pages || {};
global.auto.pages.Calculator = Calculator;