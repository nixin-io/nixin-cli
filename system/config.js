// ----------------------------------------------------------------------
// Config
// ----------------------------------------------------------------------

/*jshint esversion: 6 */

var $ = require("./lib");

// --- Config ------------------------------------------------------------

// set production flag
// --prod || -p \\ --env=prod
process.isProd = $.argv.prod || $.argv.p || $.gutil.env.env === "prod" || false;


// Default config
// @config {paths}
var config = {
    source: "./source",
    dest: "./dist",
    app: "app",
    vendor: "vendor",
    sourcemaps: {
        includeContent: true,
        addComment: !process.isProd
    },
    autoprefixer: {
        browsers: ['last 3 versions'],
        cascade: false
    },
    stylus: {},
    sass: {},
    browserify: {},
    pug: {},
    bower: {
        plugins: [],
        order: []
    },
    serve: {
        host: "local.dev",
        proxy: "local.dev/",
        port: "8001"
    }
};

module.exports = config;