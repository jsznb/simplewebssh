
// CREATE USER 'test'@'localhost' IDENTIFIED WITH mysql_native_password BY 'test';
// GRANT ALL PRIVILEGES ON *.* TO 'test'@'localhost';
export const mysqlConf = {
  host: '127.0.0.1', 
  user: 'test', //用户
  password: 'test', //密码
  port: '3306', //端口
  database: 'devops', //要连接的数据库
}

export const sqliteConf = {
  database: 'devops.db', //要连接的数据库
}

// export const redisConf = {
//   url: 'redis://127.0.0.1:6379'
// }