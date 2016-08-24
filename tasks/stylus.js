// ----------------------------------------------------------------------
// Stylus
// ----------------------------------------------------------------------

/*jshint esversion: 6 */

module.exports = (gulp, config, kernel, $) => {

    // --- Dependencies -------------------------------------------------

    // extending module dependencies with project dependencies
    // using $ as alias
    Object.assign($, {
        stylus: require("gulp-stylus"),
        autoprefixer: require("gulp-autoprefixer"),
        sourcemaps: require("gulp-sourcemaps"),
        cached: require("gulp-cached"),
        gzip: require("gulp-gzip"),
        buffer: require("vinyl-buffer"),
        mirror: require("gulp-mirror"),
        cssnano: require("gulp-cssnano"),
        groupMq: require("gulp-group-css-media-queries"),
        postcss: require("postcss")
    });

    // --- Config -------------------------------------------------------

    // merging project plugins with default module plugins
    // and assign to use option
    var plugins = [].concat(config.npm.stylus);

    // extending default config with project config
    Object.assign(config.stylus = {
        source: ["/styles"],
        dest: "",
        inputExt: "styl",
        outputExt: "{css,css.map,css.gz}",
        opts: {
            import: [],
            use: plugins,
            "include css": true,
            compress: process.isProd,
            comment: !process.isProd
        }
    });

    // --- Public -------------------------------------------------------

    function clean() {
        gulp.task("clean:stylus", () => {
            $.del(kernel.setCleanStack("stylus", config.app))
        });
    }

    function create() {
        gulp.task("stylus", ["clean:stylus"], (cb) => {
            return gulp.src(kernel.setSourceStack("stylus", config.stylus.inputExt))
                .pipe($.cached(config.dest, {
                    extension: ".css"
                }))
                .pipe($.buffer())
                .pipe($.sourcemaps.init({loadMaps: true}))
                .pipe($.stylus(config.stylus.opts), (res) => {
                    $.gutil.log("in result");
                    console.log(res);
                    res.on("end", () => {
                        console.log('res.end');
                        cb();
                    });
                    res.on("data", () => {
                        console.log("res.data");
                    });
                }).on("error", (e) => {
                    $.gutil.log("in error");
                    cb(e);
                })
                .pipe($.autoprefixer(config.autoprefixer))
                .pipe($.rename((filepath) => {
                    kernel.rewritePath(filepath, config.app);
                }))
                .pipe(kernel.addSuffixPath())
                // .on('data', function (chunk) {
                //     var contents = chunk.contents.toString().trim();
                //     var bufLength = process.stdout.columns;
                //     var hr = '\n\n' + Array(bufLength).join("_") + '\n\n';
                //     if (contents.length > 1) {
                //         process.stdout.write('\n');
                //         process.stdout.write(chunk.path);
                //         process.stdout.write(contents);
                //         process.stdout.write(hr);
                //     }
                // })
                .pipe($.groupMq())
                .pipe($.if(!process.isProd, $.sourcemaps.write(config.sourcemaps)))
                .pipe($.if(process.isProd, $.mirror(
                    $.cssnano(),
                    $.cssnano().pipe($.gzip())
                )))
                .pipe(gulp.dest(config.dest))
                .pipe($.size({
                    showFiles: true
                }))
                .pipe($.browserSync.reload({
                    stream: true
                }));
        });
    }

    // --- API ----------------------------------------------------------

    return {
        clean: clean(),
        create: create()
    };

};
