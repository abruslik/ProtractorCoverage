var HtmlReporter = require('protractor-jasmine2-screenshot-reporter');

//Define reported object
var reporter = new HtmlReporter({
    dest: 'ReportProtractor',       //Related path to Test summary report folder
    filename: 'report.html',        //The name of HTML report
    reportOnlyFailedSpecs: false,   //Failed and passed tests will be added to HTML report
    captureOnlyFailedSpecs: true,   //Screen shots for failed tests only will be captured
    cleanDestination: true,         //The report folder will be deleted before run
    //This will locate screenshots in folders depending on browser name and version
    pathBuilder: function(currentSpec, suites, browserCapabilities) {
        return browserCapabilities.get('browserName') + '_' + browserCapabilities.get('version') + '/' + currentSpec.id;
    }
});

exports.config = {
    //Add protractor plugin
    plugins : [{
        package: 'protractor-istanbul-plugin',
        logAssertions: true,
        failAssertions: true
    }],

    // Setup the report before any tests start
    beforeLaunch: function() {
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
    },
    // Assign the test reporter to each running instance
    onPrepare: function () {
        jasmine.getEnv().addReporter(reporter);
    },
    // Close the report after all tests finish
    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },

    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Spec filter
    specs: [
        'specs/calc*spec.js'
    ],

    //Browser capabilities
    multiCapabilities: [
        {'browserName': 'chrome'}
    ],
    maxSessions: 1,

    //additional objects to be used in tests via browser.params.
    params: {
        baseUrl: 'http://localhost:8000/'
    }
};
