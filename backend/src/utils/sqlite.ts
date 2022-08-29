import sqlite3 from 'sqlite3';
import { SqliteConf } from "../config";
let db = new sqlite3.Database(SqliteConf.database)

export async function exesql(sql, ...args) {
  try {
    return await query(db, sql, ...args)
  } catch (err: any) {
    throw err.sqlMessage
  }
  // 断开/关闭链接   执行完sql语句就可以关闭连接
}

const query = function (db: any, sql, ...args: any) {
  // 返回一个 Promise
  return new Promise((resolve, reject) => {
    db.all(sql, ...args, (err, data) => {
      if (err) console.error(err)
      resolve(data)
    })
  });
};

// const main = async () => {
//   // console.log(await exesql('drop table lorem'));
//   console.log(await exesql(`create table test(info TEXT)`))
//   console.log(await exesql(`select * from test`))
//   console.log(await exesql(`insert into test (info)values('666')`))
//   console.log(await exesql(`select * from test`))
//   console.log(await exesql(`update test set info='665' where info='666'`))
//   console.log(await exesql(`select * from test`))
// }
// main()

