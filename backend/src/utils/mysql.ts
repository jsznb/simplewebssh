// 入口
const mysql = require('mysql');
import { MysqlConf } from "../config";
import log from "./log";

const pool = mysql.createPool(MysqlConf);
export async function exesql(sql, ...args) {
  try {
    return await query(pool, sql, ...args)
  } catch (err: any) {
    throw err.sqlMessage
  }
  // 断开/关闭链接   执行完sql语句就可以关闭连接
}

const query = function (pool: any, sql, ...args: any) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    pool.getConnection((err: any, connection: any) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, args, (err: any, rows: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          // 结束会话
          connection.release();
        });
      }
    });
  });
};

// const main = async () => {
//   console.log(await exesql(`select * from sshconf where id = ?`, 1))
// }
// main()