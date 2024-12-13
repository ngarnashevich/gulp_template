const buildFolder = `./build`;
const srcFolder = `./src`;

// Пути к папкам и файлам проекта
export const path = {
    build: {
        html: `${buildFolder}/`,
        scripts: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        images: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
    },
    src: {
        html: `${srcFolder}/html/pages/*.html`,
        scripts: `${srcFolder}/js/app.js`,
        scss: `${srcFolder}/scss/main.scss`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        svg: `${srcFolder}/img/**/*.svg`,
        fonts: `${srcFolder}/fonts/**/*.*`,
    },
    watch: {
        html: `${srcFolder}/html/**/*.html`,
        scripts: `${srcFolder}/js/app.js`,
        scss: `${srcFolder}/scss/**/*.scss`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        fonts: `${srcFolder}/fonts/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
};

import gulp from "gulp";
import notify from "gulp-notify";
import newer from "gulp-newer";
import plumber from "gulp-plumber";
import rename from "gulp-rename";
import browsersync from "browser-sync";
import dartsass from "sass";
import gulpsass from "gulp-sass";
import autoprefixer from "autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import fileInclude from "gulp-file-include";
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
// import del from 'del';
import { deleteAsync } from "del";
import uglify from "gulp-uglify";
import postcss from "gulp-postcss";
import cssnano from "cssnano";

const sass = gulpsass(dartsass);

//server
export const server = () => {
    browsersync.init({
        server: {
            baseDir: `${path.build.html}`,
        },
        port: 3000,
        notify: false,
    });
};

//html
export const html = () => {
    return gulp
        .src(path.src.html)
        .pipe(
            plumber(
                notify.onError({
                    title: "HTML",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(fileInclude())

        .pipe(gulp.dest(path.build.html))
        .pipe(browsersync.stream());
};

//css
export const css = () => {
    return gulp
        .src(path.src.scss)
        .pipe(
            plumber(
                notify.onError({
                    title: "SCSS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            sass({
                outputStyle: "expanded",
                api: "modern",
            })
        )

        .pipe(groupCssMediaQueries())
        .pipe(
            postcss([
                autoprefixer({ grid: "autoplace" }),
                cssnano({
                    preset: [
                        "default",
                        { discardComments: { removeAll: true } },
                    ],
                }),
            ])
        )
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(path.build.css))
        .pipe(browsersync.stream());
};

//scripts
export const scripts = () => {
    return gulp
        .src(path.src.scripts)
        .pipe(
            plumber(
                notify.onError({
                    title: "JS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js",
            })
        )
        .pipe(gulp.dest(path.build.scripts))
        .pipe(browsersync.stream());
};

//del
export const reset = () => {
    return deleteAsync(path.clean);
};

//image
export const images = () => {
    return gulp
        .src(path.src.images)
        .pipe(
            plumber(
                notify.onError({
                    title: "IMAGES",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(newer(path.build.images))
        .pipe(webp())
        .pipe(gulp.dest(path.build.images))
        .pipe(gulp.src(path.src.images))
        .pipe(newer(path.build.images))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3, // 0 to 7
            })
        )
        .pipe(gulp.dest(path.build.images))
        .pipe(gulp.src(path.src.svg))
        .pipe(gulp.dest(path.build.images))
        .pipe(browsersync.stream());
};

//fonts
export const fonts = () => {
    return gulp
        .src(path.src.fonts)
        .pipe(
            plumber(
                notify.onError({
                    title: "FONTS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(gulp.dest(path.build.fonts))
        .pipe(browsersync.stream());
};

const watcher = () => {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, css);
    gulp.watch(path.watch.scripts, scripts);
    gulp.watch(path.watch.images, images);
};

const development = gulp.series(
    reset,
    html,
    css,
    scripts,
    fonts,
    images,
    gulp.parallel(watcher, server)
);

export default development;
