/* eslint import/no-extraneous-dependencies: 0 */
const fs = require('fs');
const {fork} = require('child_process');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.hot');
const bodyParser = require('body-parser');
const proxyMiddleware = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const MOCK_SERVER_PORT = 12345; //mock_server 端口

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: false }));
// mock
app.use('/mock', mockRouter);
// proxy
app.use('/oms', proxyMiddleware({ target: 'http://localhost:8083/mock/db', changeOrigin: true }));
// proxy
app.use('/src/asset', proxyMiddleware({ target: 'http://localhost:8088', changeOrigin: true }));


// app.use('/test', require('./mock/mock'));
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  inline: true,
  progress: true,
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

/**
 * 创建mock子进程
 * */
let childProcess;
function createProcess(){
    childProcess && childProcess.kill('SIGKILL');
    childProcess = fork('./mock/mock-server.js',[MOCK_SERVER_PORT.toString()]);
    console.log(`child process ${childProcess.pid} created`);
    childProcess.on('exit', (code, single) => {
        console.log(`child process ${childProcess.pid} exited with code ${code} single ${single}`);
    });
}
createProcess();
fs.watch('./mock',{recursive: true},function (eventType, filename) {
    if(/database.json$/.test(filename)) return;
    console.log(`${filename} modified ...`);
    preCreate();
})
/*防止重启子进程的频率太高*/
let id;
function preCreate() {
    clearTimeout(id);
    id = setTimeout(() => {
        createProcess();
    }, 2000);
}

// 将其他路由，全部返回index.html
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

// proxy
app.use('/', proxyMiddleware({ target: `http://localhost:${MOCK_SERVER_PORT}`, changeOrigin: true }));

app.listen(8083, () => {
  console.log('正常打开8083端口');
});


