require('express-async-errors');
import { ServerConf } from '../../config';
import Log from '../../utils/log';
import { Express } from '..';


//iptable
{
  const conf: any = ServerConf
  if (conf.iptable) {
    Log.info('加载 iptable 中间件');
    const AccessControl = require('express-ip-access-control');
    const options = {
      mode: conf.iptable.mode,
      denys: conf.iptable.denys,
      allows: conf.iptable.allows,
      forceConnectionAddress: false,
      log: function (clientIp: any, access: any) {
        if (!access) {
          Log.error(`${clientIp} access denied.`);
        }
      },
      statusCode: 401,
      redirectTo: '',
      message: 'Host Not Allowed'
    };
    Express.app.use(AccessControl(options));
  }
}