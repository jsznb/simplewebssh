import { exesql } from "../utils/sqlite"
// import { exesql } from "../utils/mysql"

export const searchCmd = async (path, limit, offset) => {
  let data = await exesql('select * from sshrule where path like ? limit ? offset ? ', path, Number(limit), Number(offset))
  let count = await exesql('select count(*) as num from sshrule where path like ?', path)
  return { data, count }
}

export const delCmd = async (id) => {
  await exesql('delete from sshrule where id = ?', id)
}

export const saveCmd = async (id, name, path, serial, rule, cmd) => {
  if (id) {
    await exesql('update sshrule set name = ?, path = ?, serial = ?, rule = ?, create_at = ?, cmd = ? where id = ?', name, path, serial, rule, Date.now(), cmd, id)
  } else {
    await exesql('insert into sshrule (id, name, path, serial, create_at, rule, cmd) values (?, ?, ?, ?, ?, ?, ?)', id, name, path, Date.now(), Date.now(), rule, cmd)
  }
}