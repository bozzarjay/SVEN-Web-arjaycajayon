const mix = require('laravel-mix');
const path = require('path');

mix.js('resources/js/app.js', 'public/js')
    .react()
    .copyDirectory('resources/images', 'public/images')
    .sass('resources/sass/font.scss', 'public/css')
    .postCss('resources/css/app.css', 'public/css', [
        require("tailwindcss"),
    ])
    //.ts('resources/ts/**/*.ts', 'public/js');

mix.webpackConfig({
    resolve: {
        alias: {
            '@app_utils': path.resolve(__dirname, 'resources/ts')
        }
    }
});