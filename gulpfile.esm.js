// automatically loads when you run the gulp command
import gulp from "gulp";
import webpack from "webpack-stream";


export async function serve () {
    return nodemon({
        script: 'src/server-start.js',
    }).on('restart', function () {
            console.log('restarted');
        })
}

export async function client() {
    return gulp.src('src/client.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('dist/'));
}
// noinspection JSUnusedGlobalSymbols
export default function defaultTask() {
    // place code for your default task here


}

