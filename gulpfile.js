var gulp = require('gulp');
var logger = require('gulplog');
var server = require('gulp-serv');
var gulpIstanbul = require('gulp-istanbul');
var through = require('through2');
var istanbul = require('istanbul');
var fs = require('fs');
var rimraf = require('gulp-rimraf');
var exec = require('child_process').exec;

/* Clean out tmp, coverage and report directories */
gulp.task('build:clean', function(callback) {
    return gulp.src(['*tmp', '*coverage', '*lcov', '*Report*'], { read: false })
        .pipe(rimraf({force:true}));
});

/* Copy files from the app to the temporary directory */
gulp.task('build:copy', function(callback) {
    return gulp.src(['app/**'])
        .pipe(gulp.dest('tmp/'));
});

/* Prepare instrumented files */
gulp.task('build:instrumented', function(callback) {
    return gulp.src(['app/**/*.js','!app/**/angular*.js','!app/**/express*.js'])
        .pipe(gulpIstanbul({
            coverageVariable: '__coverage__'
        }))
        .pipe(gulp.dest('tmp/'));
});

/* Start http server with instrumented application */
gulp.task('server:start', function(callback) {
    server.start({
        root: __dirname + '/tmp',
        host: '0.0.0.0',
        port: 8000
    }, callback);
});

/* WebDriver: start updating binary files */
gulp.task('driver:update',function(callback){
    logger.info('WebDriver:', 'updating web-driver manager...');
    var child = exec('node node_modules/protractor/bin/webdriver-manager update --standalone', {maxBuffer: 1024 * 1024 * 1024}, function(err){
        callback(err);
    });
    child.stdout.on('data', function(data){
        logger.info('WebDriver:', data.trim());
        if (data.includes('geckodriver: vv0.11.1 up to date')){
            callback();
        }
    });
});

/* WebDriver: start standalone selenium hub */
gulp.task('driver:start', function(callback){
    logger.info('WebDriver:', 'starting webdriver standalone...');
    var enableLog = true;
    var child = exec('node node_modules/protractor/bin/webdriver-manager start --standalone', {maxBuffer: 1024 * 1024 * 1024}, function (err) {
        callback(err);
    });
    child.stderr.on('data', function(data){
        if (enableLog){
            logger.info('WebDriver:', data.trim());
        }
        if (data.includes('Selenium Server is up and running')){
            enableLog = false;
            callback();
        }
    });
});

/* WebDriver: stop standalone selenium hub */
gulp.task('driver:stop', function(callback){
    logger.info('WebDriver:', 'shouting down webdriver...');
    exec('node node_modules/protractor/bin/webdriver-manager shutdown', {maxBuffer: 1024 * 1024 * 1024}, function (err) {
            callback(err);
    });
    return callback();
});

/* Protractor: launch protractor tests */
gulp.task('launch:protractor', function (callback) {
    logger.info('Protractor:', 'launching protractor tests...');
    var wm = exec('node node_modules/protractor/bin/protractor tests/e2e/protractor.conf.js', {maxBuffer: 1024 * 1024 * 1024}, function (error, stdout, stderr) {
        if (stdout) {
            console.log(stdout);
        }
        if (stderr){
            console.log(stderr);
        }
        if (error !== null) {
            callback(error);
        }
    });
    wm.stdout.on('data', function(data){
        console.log(data.trim());
        if(data.includes(' E/launcher - Process exited ')){
            callback();
        }
    });
});

/* Coverage report: create coverage report using istanbul package */
gulp.task('report:coverage', function(done) {
    var collector = new istanbul.Collector();
    var textReport = istanbul.Report.create('text');
    var textSummaryReport = istanbul.Report.create('text-summary');
    var lcovReport = istanbul.Report.create('lcov');

    return gulp.src('./coverage/*.json')
        .pipe(through.obj(function (file, enc, callback) {
            collector.add(JSON.parse(fs.readFileSync(file.path, 'utf8')));
            return callback();
        }))
        .on('end', function () {
            textReport.writeReport(collector,true);
            textSummaryReport.writeReport(collector, true);
            lcovReport.writeReport(collector, true);
            // stopping of the server, as it doesn't die very gracefully
            server.stop();
        });
});

/* Coverage report: rename coverage report directory */
gulp.task('report:rename', function(callback) {
    fs.rename('lcov-report', 'ReportCoverage', function (err) {
        if (err) {
            throw err;
        }
        callback();
    });
});

/* Complex task to run tests*/
gulp.task('test:protractor', gulp.series('build:clean', 'build:copy', 'build:instrumented', 'server:start', 'driver:update', 'driver:start', 'launch:protractor', 'report:coverage', 'driver:stop', 'report:rename'));
