//these are dev helper tasks, they shouldn't be part of any build / should be moved out of VC
'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var responsive = require('gulp-responsive');
var filter = require('gulp-filter');

gulp.task('360-images', function styles() {
    gulp.src('./assets/shirtguide-images/raw/**/*.*')
    .pipe(rename(function renamefunc(path) {
        var num = path.basename.split('-')[1];
        // ok so the files end in numbers but they start at apparently random numbers so we need to normalise
        var arbitraryNumber = 0;
        if (path.dirname.indexOf('Pinpoint') > -1) {
            arbitraryNumber  = 431;
        }
        if (path.dirname.indexOf('Broadcloth') > -1) {
            arbitraryNumber  = 227;
        }
        if (path.dirname.indexOf('Transparent') > -1) {
            arbitraryNumber  = 227;
        }
        if (path.dirname.indexOf('retouched') > -1) {
            var num = path.basename.split('_').pop();
            arbitraryNumber  = 104;
        }
        path.basename = num - arbitraryNumber;
    }))
    .pipe(responsive(
        {
            '**/*.*': [{
                width: 480
            },
            {
                width: 480,
                rename: {
                    suffix: '-480px'
                }
            }, {
                width: 960,
                rename: {
                    suffix: '-960px'
                }
            }, {
                width: 1920,
                rename: {
                    suffix: '-1920px'
                }
            }]
        },
        {
            // Global configuration for all images
            // The output quality for JPEG, WebP and TIFF output formats
            quality: 80,
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
            // Do not emit the error when image is enlarged.
            errorOnEnlargement: false
        }))
    .pipe(gulp.dest('./assets/shirtguide-images/responsive/'));
});
