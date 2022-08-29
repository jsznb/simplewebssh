import { ServerConf } from "../../config";
import { Server } from "./server";
import Log from '../../utils/log';
// listen
{
  const conf: any = ServerConf
  const server: any = Server()
  server.listen(conf.port, () => Log.info(`Server: 监听 ${conf.port} 端口...`));
}