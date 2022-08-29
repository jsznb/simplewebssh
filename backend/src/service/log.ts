import { exesql } from "../utils/sqlite"
// import { exesql } from "../utils/mysql"

export const searchHostLog = async (path, limit, offset) => {
  let data = await exesql('select * from sshlog where path = ? order by id desc limit ? offset ?', path, Number(limit), Number(offset))
  let count = await exesql('select count(*) as num from sshlog where path like ?', path)
  return { data, count }
}

