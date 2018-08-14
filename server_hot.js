/* eslint import/no-extraneous-dependencies: 0 */
const express = require('express');
const proxyMiddleware = require('http-proxy-middleware');
const { fork } = require('child_process');
const fs = require('fs');
const webpack = require('webpack');
const config = require('./webpack.hot');

const MOCK_SERVER_PORT = 54321; // mock_server 端口
const app = express();

const compiler = webpack(config);
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
function createProcess() {
  if (childProcess) {
    childProcess.kill('SIGKILL');
  }
  childProcess = fork('./mock/mock-server.js', [MOCK_SERVER_PORT.toString()]);
  console.log(`child process ${childProcess.pid} created`);
  childProcess.on('exit', (code, single) => {
    console.log(`child process ${childProcess.pid} exited with code ${code} single ${single}`);
  });
}
createProcess();

/* 防止重启子进程的频率太高 */
let id;
function preCreate() {
  clearTimeout(id);
  id = setTimeout(() => {
    createProcess();
  }, 2000);
}
fs.watch('./mock', { recursive: true }, (eventType, filename) => {
  if (/database.json$/.test(filename)) return;
  console.log(`${filename} modified ...`);
  preCreate();
});

// 将其他路由，全部返回index.html
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.use('/', proxyMiddleware({
  target: `http://localhost:${MOCK_SERVER_PORT}`,
  changeOrigin: true,
}));

app.listen(12138, () => {
  console.log('Dev server listening on port 12138');
});
