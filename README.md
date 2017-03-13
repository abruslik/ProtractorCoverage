# ProtractorCoverage.
An example how Protractor tests can be run together with Istanbul tool to get a coverage report of executed tests.

## Prerequisites.
This project has been designed for Windows environment, but can be easily adapted for Mac OS and Unix/Linux systems. It will be enough to change **exec** commands to run webdriver and protractor in some tasks defined in gulpfile.js.

System prerequisites:
 * **Node.JS** version 6.10.x (LTS);
 * **Git** commandline client - will be used to get dependencies from git hub repositories;
 * **gulp-CLI** version 1.2.2 - this npm package must be installed with -global argument and it will be used for running **gulp** tasks defined in the **gulpfile.js**;
 * **java** version 1.8.0_121 or greater - is required for Selenium WebDriver;

## Project structure.
  ```
    ├ app/                             - Angular project directory
    │   ├ angular.min.js
    │   ├ bootstrap.css
    │   ├ calc.js                      - calculator controller
    │   ├ expressserver.js
    │   └ index.html                   - calculator view
    ├ tests/
    │   ├ e2e/                         - protractor tests directory
    │   │   ├ specs/
    │   │   │   └ calc_test_spec.js    - protractor specs for angular app
    │   │   └ utils/
    │   │       └ calc_page.js         - page object for tested application
    │   └ protractor.conf.js           - protractor config
    ├ gulpfile.js                      - gulp tasks
    ├ package.json
    └ README.md
  ```
## How it works.
Provided example contains protractor project where **protractor-istanbul-plugin** is used to extract code coverage data from application loaded into browser. The source code of application should be instrumented before protractor running. During running of protractor tests on instrumented application the plugin will extract coverage data into **/coverage/** directory. Html report will be generated as soon as protractor tests complete.

## How to run?
  1. Make sure that your system is configured according to system prerequisites.
  2. Clone repository.
  3. Run command from project's directory: npm install
  4. Make sure that required packages are installed without errors
  5. Run command from project's directory: gulp test:protractor

  As a result **ReportProtractor** and **ReportCoverage** directories will be generated.

## Notes.
