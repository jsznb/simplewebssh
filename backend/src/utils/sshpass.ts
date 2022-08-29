import ssh2, { ClientChannel } from 'ssh2'
import { EventEmitter } from 'stream';

export class sshpass {
  public expect: { match, call, callback }[] = []
  public routes: any[]
  public connections = [new ssh2.Client()]
  public isConnected = false
  public target = ""
  public emitter = new EventEmitter();

  public constructor(forwoadRoutes) {
    this.routes = forwoadRoutes
  }

  public connect() {
    return new Promise<void>((resolve, reject) => {
      if (this.isConnected) {
        return
      }
      const forwardRoutes = this.routes
      if (forwardRoutes.length < 1) {
        this.emit('error', new Error('Invalid ssh pass config'))
      }
      const conns = this.connections
      for (let i = 0; i < forwardRoutes.length; i++) {
        const isLast = i + 1 == forwardRoutes.length
        const forwardPort = 12345
        let thisHop = forwardRoutes[i]
        let thisConn = conns[i]
        if (isLast) {
          thisConn.on('ready', async () => {
            console.log(`=> ${i} ${thisHop.host} IN:: connection ready `)
            this.target = thisHop.host
            resolve()
          }).on('error', (err) => {
            this.emit('error', err)
          })
        } else {
          let nextHop = forwardRoutes[i + 1]
          let nextConn = new ssh2.Client()
          conns.push(nextConn)
          thisConn.on('ready', () => {
            process.stdout.write(`-> ${i} ${thisHop.host} JUMP:: `)
            thisConn.forwardOut('127.0.0.1', forwardPort, nextHop.host, nextHop.port, (err, stream) => {
              if (err) {
                console.log('+>', i + 1, nextHop.host, 'JUMP:: forwardOut error: ' + err);
                this.emit('error', err);
              }
              let conf = {
                sock: stream,
                username: nextHop.username,
                password: nextHop.password,
                privateKey: nextHop.privateKey,
                keepaliveInterval: 30000
              }
              nextConn.connect(conf).on('error', (err) => {
                this.emit('error', err);
              });
            })
          }).on('error', (err) => {
            this.emit('error', err);
          })
        }
      }
      forwardRoutes[0].keepaliveInterval = 30000
      conns[0].connect(forwardRoutes[0])
    })
  }

  public ping() {
    return this.connect().then(() => {
      this.emit('sshconn')
      console.log('Ping 成功')
    }).catch((err) => {
      console.log('Ping 失败', err)
    })
  }

  public term() {
    return new Promise<void>((resolve, reject) => {
      this.connections[this.connections.length - 1].shell(async (err, stream) => {
        if (err) {
          this.emit('error', err)
        }
        stream.on('data', (data) => {
          let str: string = data.toString()
          this.emit('fromssh', str)
        })
        this.on('tossh', (str) => {
          stream.write(str)
        })
        stream.on('close', () => {
          this.emit('sshclose')
          resolve()
        });
      });
    })
  }

  public async close() {
    const forwardRoutes = this.routes
    const conns = this.connections
    try {
      const unbind = (conn, host, port) => {
        return new Promise<void>((resolve, reject) => {
          conn.unforwardIn(host, port, () => {
            conn.end()
            conn.destroy()
            resolve()
          })
        })
      }
      for (let i = conns.length - 2; i >= 0; i--) {
        await unbind(conns[i + 1], forwardRoutes[i].host, forwardRoutes[i].port)
      }
      conns[0].end()
      conns[0].destroy()
      this.isConnected = false
    } catch (error) { }
    try {
      conns[0].end()
      conns[0].destroy()
      this.isConnected = false
    } catch (error) { }
  }

  public emit(event: "sshconn" | "error" | "warn" | "sshclose" | "fromssh" | "tossh", ...args) {
    this.emitter.emit(event, ...args)
  }

  public on(event: "sshconn" | "error" | "warn" | "sshclose" | "fromssh" | "tossh", cb) {
    this.emitter.on(event, cb)
  }

  public off(event: "sshconn" | "error" | "warn" | "sshclose" | "fromssh" | "tossh") {
    this.emitter.removeAllListeners(event)
  }
}
