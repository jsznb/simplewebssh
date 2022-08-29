// 日志有关
import fs from 'fs';
import path from 'path';
import { LogConf } from '../config';

// 日志类型
export type LOGType = 'ERROR' | 'INFO' | 'WARING' | 'DEBUG';

class Log {
  public dir: string = LogConf.LOG_DIR;
  private static instance: Log;
  public static getInstance(): Log {
    this.instance = this.instance || new Log();
    return this.instance;
  }
  constructor() {
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir);
    }
  }

  public write(type: LOGType, str: string): void {
    const time = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
    const oldTime = dateFormat(
      new Date(new Date().setDate(new Date().getDate() - LogConf.LOG_SAVA_DAY)),
      'yyyy-MM-dd'
    );
    let msg = `${time} ${type} ${str.trim()}`;
    console.log(msg);
    fs.appendFileSync(
      path.resolve(this.dir, `./${dateFormat(new Date(), 'yyyy-MM-dd')}.log`),
      `${msg}\n`,
      'utf8'
    );
    // 删除老的文件
    this.delete(oldTime);
  }

  public debug(str: any): Log {
    this.write('DEBUG', JSON.stringify(str));
    return this;
  }

  public info(str: any): Log {
    this.write('INFO', JSON.stringify(str));
    return this;
  }

  public warn(str: any): Log {
    this.write('WARING', JSON.stringify(str));
    return this;
  }

  public error(str: any): Log {
    this.write('ERROR', JSON.stringify(str));
    return this;
  }

  public read(type: LOGType, date: string): void {
    const filename = path.resolve(this.dir, `./${date}.log`);
    if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
      // 存在并且是文件
      fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
          this.error(`读取${date}日志文件出错！`);
          return '';
        } else {
          return data;
        }
      });
    }
  }
  public delete(date: string): void {
    const filename = path.resolve(this.dir, `./${date}.log`);
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename); // 删除
    }
  }
}

export default Log.getInstance();

function dateFormat(date: Date, fmt: string): string {
  const o: any = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (const k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
}