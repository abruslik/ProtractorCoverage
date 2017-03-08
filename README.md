# ProtractorCoverage.
An example of automated testing project to test Angular app using Protractor and extract coverage using Istanbul tool.

## Pre-requisites.
This project has been designed under Windows environment, but should have easy adaptation for Mac OS and Unix/Linux systems.
System pre-requisites:
 * **Node.JS** version 6.10.x (LTS);
 * **Git** client - will be used to get dependencies from git hub repositories;
 * **gulp-CLI** version 1.2.2 - this npm package must be installed with -global argument and it will be used for running **gulp** tasks defined in the **gulpfile.js**;
 * **java** version 1.8.0_121 or greater - is required for Selenium WebDriver;

## Project structure.
  ```
    ├ app/                              - Angular project directory
    │   ├ angular.min.js
    │   ├ bootstrap.css
    │   ├ calc.js                      - calculator controller
    │   ├ expressserver.js
    │   └ index.html                   - calculator view
    ├ tests/
    │   ├ e2e/                         - protractor tests directory
    │   │   ├ specs/
    │   │   │   └ calc_test_spec.js   - protractor specs for angular app
    │   │   └ utils/
    │   │       └ calc_page.js         - page object for tested application
    │   └ protractor.conf.js            - protractor config
    ├ gulpfile.js                       - gulp tasks
    ├ package.json
    └ README.md
  ```
## How does it work?

## How to run?
  Clone repository.
  Run command from project directory: npm install
  Make sure that required packages are installed without errors
  Run command from project directory: gulp test:protractor

## Notes.
