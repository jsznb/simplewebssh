import { ServerConf } from '../../config';
import Log from '../../utils/log';
import { Express } from '..';


//Show Url
{
  const conf: any = ServerConf
  Log.info('加载 show url 中间件');

  Express.app.use((req, res, next) => {
    Log.info(`${req.headers.host} ${req.originalUrl}`)
    next()
  });
}