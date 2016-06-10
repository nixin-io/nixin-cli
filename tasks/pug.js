// ----------------------------------------------------------------------
// Pug
// ----------------------------------------------------------------------

/*jshint esversion: 6 */

module.exports = function(gulp, config, routes, utils, $, _) {

    // Dependencies
    // ---------------------------------------------------------

    // extending module dependencies with project dependencies
    // using $ as alias
    _.extend($, {
        pug: require("gulp-pug"),
        jadeGlobbing: require("gulp-jade-globbing"),
        cached: require("gulp-cached")
    });

    // Config
    // ---------------------------------------------------------

    // extending default config with project config
    _.extend(config.pug, {
        paths: "/**/**/*.pug",
        opts: {
            base: "markup",
            pretty: true,
            cache: true
        }
    });

    // Public
    // ---------------------------------------------------------

    function clean() {
        gulp.task("clean:pug", function() {
            $.del(config.dest + "/markup/**/*.html", {
                force: true
            });
        });
    }

    function create() {
        gulp.task("pug", ["clean:pug"], function() {
            return gulp.src(config.source + config.pug.paths)
                .pipe($.cached(config.dest, {
                    extension: '.html'
                }))
                .pipe($.pug(config.pug.opts))
                .on('error', utils.errors)
                .pipe(gulp.dest(config.dest))
                .pipe($.size({
                    showFiles: true
                }))
                .pipe($.if(process.isProd, $.browserSync.reload({
                    stream: true
                })));
        });
    }

    // API
    // ---------------------------------------------------------

    return {
        clean: clean(),
        create: create()
    };
};