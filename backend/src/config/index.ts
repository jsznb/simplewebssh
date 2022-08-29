/* eslint-disable */
// 配置
import path from 'path';
import fs from 'fs';

export const rootDir = path.resolve(`./`);
export const solDir = path.resolve(`${rootDir}/src/sol/`);
// 环境
export const isProduction = process.env.NODE_ENV == 'test';

// 服务器配置
export const ServerConf = {
  websocket: true,
  port: 44000,
  // https: {
  //   key:fs.readFileSync(path.resolve(__dirname,'../ca/server.key')),
  //   cert:fs.readFileSync(path.resolve(__dirname,'../ca/server.crt'))
  // },

  // iptable: {
  //   mode: "allow",
  //   allows: ['127.0.0.1', '0.0.0.0/0', "192.168.0.0/16"],
  //   denys: [],
  // }
}

//   iptable: {
//     mode: "allow",
//     allows: ['127.0.0.1','0.0.0.0/0',"192.168.0.0/16"],
//     denys: [],
//   }
// }

// Jwt 配置
export const JwtConf = {
  secret: "123456",
  expires: "7 days"
}

// database 配置
export const MysqlConf = require('./database').mysqlConf
export const SqliteConf = require('./database').sqliteConf
export const RedisConf = require('./database').redisConf

export const LogConf = {
  LOG_DIR: path.resolve(__dirname, '../logs'), // 日志目录
  LOG_SAVA_DAY: 30
}

