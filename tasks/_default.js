// ----------------------------------------------------------------------
// Default
// ----------------------------------------------------------------------


import taskListing from 'gulp-task-listing';


module.exports = (gulp, config, kernel, $) => {

    'use strict';

    let brand = () => {
        console.log($.colors.green(" "));
        console.log($.colors.green(" __ _  _   __ __ __ _"));
        console.log($.colors.green("|  \| || |\ \/ /| ||  \| |"));
        console.log($.colors.green("|_|\__||_|/_/\_\|_||_|\__|"));
        console.log($.colors.green(" "));
    };

    // API
    // ---------------------------------------------------------

    return gulp.task("default", () => {
        brand();
        taskListing();
    });
};
