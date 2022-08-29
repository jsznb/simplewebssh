require('express-async-errors');
import { ServerConf } from '../../config';
import Log from '../../utils/log';
import { Express } from '..';

//http 与 https
let server = null
const getServer = () => {
  const conf: any = ServerConf
  if (conf.https && conf.https.key && conf.https.cert) {
    Log.info('启动 https 服务');
    if (conf.websocket) {
      Log.info('启动 wss 服务');
    }
    const https = require('https')
    const options = {
      key: conf.https.key,
      cert: conf.https.cert
    }
    return https.createServer(options, Express.app);
  } else {
    if (conf.https) {
      Log.info('不存在 ca 配置, 启动 http 服务');
    } else {
      Log.info('启动 http 服务');
    }
    if (conf.websocket) {
      Log.info('启动 ws 服务');
    }
    return Express.app;
  }
}

export const Server = () => {
  if (!server) {
    server = getServer()
  }
  let s: any = server
  return s
}