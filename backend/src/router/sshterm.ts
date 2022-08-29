// Express 组件
import { Express } from '.';
import { handleCmd, matchAndDo, nextMatch } from '../service/term';
import { exesql } from '../utils/sqlite';
// import { exesql } from '../utils/mysql';
import { sshpass } from '../utils/sshpass';
// Service 方法

// SSH Terminal WebSocket
Express.router.ws('/ssh/term', async (ws: any, req: any) => {
  try {
    if (!req.query.path) {
      await ws.send("blank host\n")
      return await ws.close();
    }
    let ans: any = await exesql("select * from sshconf where path = ? limit 1", req.query.path);
    if (ans.length < 1) {
      await ws.send(`host(${req.query.path}) not found\n`)
      return await ws.close();
    }
    let term = ans[0];
    let ssh = new sshpass(JSON.parse(term.conf))
    let tmpmsg = ''
    ws.on('message', async (msg: string) => {
      try {
        if (await handleCmd(ws, term, ssh, msg)) { // 处理 系统保留关键字命令
        } else if (await matchAndDo(ws, term, ssh, msg)) { // 匹配 动态规则
        } else { // 正常处理
          ssh.emit("tossh", msg)
          tmpmsg += msg
          if (/[\n\r\t]$/g.test(msg)) {
            await exesql('INSERT INTO sshlog(hostid,path,tags,content,create_at) VALUES (?,?,?,?,?);', term.id, term.path, '', tmpmsg, Date.now())
            tmpmsg = ''
          }
        }
      } catch (error) {
        console.log(error)
        ws.send(JSON.stringify({ event: "error", error }))
      }
    })
    ws.on('close', (msg) => {
      if (tmpmsg.length > 0) {
        exesql('INSERT INTO sshlog(hostid,path,tags,content,create_at) VALUES (?,?,?,?,?);', term.id, term.path, '', tmpmsg, Date.now())
      }
      console.log('close', msg)
      ssh.emit("sshclose")
      ssh.close();
    })
    ssh.on("sshclose", () => {
      ws.send("ssh disconnected")
      ws.close()
    })
    ssh.on("fromssh", async (msg) => {
      ws.send(msg)
      // match and send
      await matchAndDo(ws, term, ssh, msg)
    })
    await ssh.ping()
    await ssh.term();
  } catch (error: any) {
    console.log(error)
    ws.send(JSON.stringify({ event: "error", error: error.message || error }))
  }
})
