import jsonwebtoken from 'jsonwebtoken';
import { JwtConf } from '../config';

export default class JWT {
  public static generate(value: any): string { // value 为传入值， expires为过期时间，这两者都会在token字符串中题先
    return jsonwebtoken.sign(value, JwtConf.secret, { expiresIn: JwtConf.expires });
  }

  public static verify(token: string) {
    return jsonwebtoken.verify(token, JwtConf.secret); // 如果过期将返回false
  }
}