// 入口
import Log from './utils/log';
require('express-async-errors');

function main() {
  Log.info('------------------------------------------------');
  Log.info('启动Node Express Web 服务程序');
  require('./router')
}
main();
