/*
 |--------------------------------------------------------------------------
 | Nixin-cli
 |--------------------------------------------------------------------------
 | author: @kreo
 | https://github.com/kreo
 |
 */


/*jshint esversion: 6 */
"use strict";

import gulp from "gulp";
import rupture from "rupture";
import jeet from "jeet";
import rucksack from "rucksack-css";
import poststylus from "poststylus";


const Nix = require("nixin-cli")(gulp, {
    source: __dirname + "/resources",
    dest: __dirname + "/public/_dist",
    tree: "tree",
    app: "app",
    vendor: "vendor",
    mail: "mail",
    npm: {
        stylus: [
            rupture(),
            jeet(),
            poststylus(rucksack)
        ],
        browserify: []
    },
    bower: {
        assets: [
            "bootstrap"
        ],
        order: [
            "jquery/*",
            "bootstrap/*",
            "**/*.js"
        ]
    },
    serve: {
        host: "localhost",
        proxy: "localhost/",
        port: "9001"
    }
});


Nix.get([
    "default",
    "images",
    "fonts",
    "bower",
    "stylus",
    "sass",
    "less",
    "browserify",
    "serve",
    "build",
    "sprites"
]);


Nix.set("build", ["bower"], [
    "images",
    "fonts",
    "bower",
    "stylus",
    "sass",
    "browserify",
    "sprites"
]);

