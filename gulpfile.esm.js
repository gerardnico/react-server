// automatically loads when you run the gulp command
import gulp from "gulp";
import webpack from "webpack-stream";
import {spawn} from "child_process";
import tcpPortUsed from 'tcp-port-used';

/**
 * https://webpack.js.org/guides/integrations/#gulp
 * @return {Promise<*>}
 */
export function bundle() {
    return gulp.src('src/client.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));
}

let serverProcess;
let port = 3000;

export async function server() {

    serverProcess = await restartServer(serverProcess);
    console.log(`Node server (re)started at http://localhost:${port}:`);

}

async function restartServer(serverProcess) {

    // kill previous spawned process
    if (serverProcess) {
        serverProcess.kill();
        await tcpPortUsed.waitUntilFree(port, 500, 4000)
        console.log('Server process has been terminated');

    }

    // `spawn` a child `gulp` process linked to the parent `stdio`
    serverProcess = spawn('node', ['src/server-start.js', port]);

    serverProcess.stdout.on('data', (data) => {
        console.log(`Server Stdout: ${data}`);
    });

    serverProcess.stderr.on('data', (data) => {
        console.error(`Server Stderr: ${data}`);
    });

    return serverProcess;
}

async function start() {
    let start = gulp.series(bundle, server);
    await start();
    await gulp.watch('src/**/*.*', start);
}

export default async function () {

    await start()

}

