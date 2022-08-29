// Express 组件
import { Express } from '.';
import { ServerConf } from "../config";

const express = require('express');
// 静态网页托管
Express.app.use(express.static('public'))
console.log(`Website: http://localhost:${ServerConf.port}`)