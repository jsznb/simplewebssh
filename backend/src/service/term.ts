// 入口
import { exesql } from '../utils/sqlite';
// import { exesql } from "../utils/mysql"
import { sshpass } from '../utils/sshpass';
// 处理
export const handleCmd = async (ws, term, ssh: sshpass, msg: string) => {
  if (msg.startsWith("@#$next")) {
    await exesql('INSERT INTO sshlog(hostid,path,tags,content,create_at) VALUES (?,?,?,?,?);', term.id, term.path, '', msg, Date.now())
    await nextMatch(ws, ssh, msg.substring("@#$next".length + 1));
    return true;
  } else if (msg.startsWith("@#$log")) {
    await exesql('INSERT INTO sshlog(hostid,path,tags,content,create_at) VALUES (?,?,?,?,?);', term.id, term.path, '', msg, Date.now())
    return true
  }
  return false;
}

export const matchAndDo = async (ws, term, ssh: sshpass, msg: string) => {
  let flag = false;

  for (let i in ssh.expect) {
    let rule = ssh.expect[i];
    if (rule.match.test(msg)) {
      await exesql('INSERT INTO sshlog(hostid,path,tags,content,create_at) VALUES (?,?,?,?,?);', term.id, term.path, '', `Msg: ${msg} Match:${rule.match} Call:${rule.call}`, Date.now())
      await rule.callback()
      flag = true;
      break;
    }
  }
  return flag
}

export const nextMatch = async (ws, ssh: sshpass, id?, path?) => {
  let ans: any = await exesql("select * from sshrule where id = ? limit 1", id);
  let rule = JSON.parse(ans[0].rule)
  ws.send(ans[0].rule)
  ssh.emit("tossh", "\n")
  ssh.expect = [] as { match, call, callback }[]
  rule.forEach(e => {
    let callback = () => { ws.send(e.call) }
    if (e.call.startsWith("@#$print"))
      callback = () => { ssh.emit("tossh", e.call.substring("@#$print".length + 1)) }
    else if (e.call.startsWith("@#$next"))
      callback = () => { nextMatch(ws, ssh, e.call.substring("@#$next".length + 1)); }
    // if (e.call.startsWith("@#$secret")) {
    //     callback = async () => {
    //         let ans: any = await exesql("select content from secret where id = ? limit 1", e.call.substring("@#$secret".length + 1));
    //         if (ans.length > 0) nextMatch(ws, ssh, ans[0].content)
    //     }
    // }
    else if (e.call.startsWith("@#$close"))
      callback = () => { ssh.close() }
    ssh.expect.push({
      match: new RegExp(e.match),
      call: e.call,
      callback
    })
  })
}