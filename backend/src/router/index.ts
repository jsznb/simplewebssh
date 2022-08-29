

import { ServerConf } from '../config';
import Log from '../utils/log';

//express
const express = require('express');
const app = express();
if (ServerConf.websocket) {
  const ws = require('express-ws')
  ws(app)
}

export const Express = {
  router: {
    use: (...args: any[]) => {
      console.log("all", args[0])
      app.use(...args)
    },
    get: (...args: any[]) => {
      console.log("get", args[0])
      app.get(...args)
    },
    post: (...args: any[]) => {
      console.log("post", args[0])
      app.post(...args)
    },
    put: (...args: any[]) => {
      console.log("put", args[0])
      app.put(...args)
    },
    ws: (...args: any[]) => {
      let conf: any = ServerConf
      if (conf.websocket && !conf.https) {
        console.log('ws', args[0])
        app.ws(...args)
      } else {
        console.log("# ws", args[0])
      }
    }
  },
  app
}
// async error
require('express-async-errors');

//iptable
require('./middlewire/iptable');

//cookies
require('./middlewire/cookie')

// log url req
require('./middlewire/showurl')

// router
Log.info('加载 router 路由...')
require('./sshterm')
require('./host')
require('./cmd')
// web app
require('./app')

//http 与 https 监听
require('./middlewire/listener');
