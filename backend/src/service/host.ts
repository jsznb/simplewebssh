import { exesql } from "../utils/sqlite"
// import { exesql } from "../utils/mysql"

export const searchHost = async (path, limit, offset) => {
  let data = await exesql('select * from sshconf where path like ? limit ? offset ? ', path, Number(limit), Number(offset))
  let count = await exesql('select count(*) as num from sshconf where path like ?', path)
  return { data, count }
}

export const delHost = async (id) => {
  await exesql('delete from sshconf where id = ?', id)
}

export const saveHost = async (id, name, path, conf) => {
  if (id) {
    await exesql('update sshconf set name = ?, path = ?, conf = ?, create_at = ? where id = ?', name, path, conf, Date.now(), id)
  } else {
    await exesql('insert into sshconf (id, name, path, conf, create_at) values (?, ?, ?, ?, ?)', id, name, path, conf, Date.now())
  }
}