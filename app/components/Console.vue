<template>
    <div class="console" id="terminal"></div>
</template>
<script>
import Terminal from './Xterm'
export default {
  name: 'Console',
  props: {
    terminal: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      term: null,
      socket: null,
      connecting : false
    }
  },
  methods: {
    runRealTerminal () {
      this.term.writeln('Connected')
    },
    errorRealTerminal () {
      this.term.writeln('Websocket Error')
    },
    closeRealTerminal () {
      this.term.writeln('Websocket Closed')
      this.connecting = false
    },
    connect(host) {
      console.log('pid : ' + this.terminal.pid + ' is on ready')
      if(this.connecting) return
      if(!this.term) {
        let terminalContainer = document.getElementById('terminal')
        this.term = new Terminal()
        this.term.open(terminalContainer)
      }
      this.term.writeln(`Connecting host(${host}) ...`)
      this.socket = new WebSocket(`ws://${location.host}/ssh/term?path=${host}`)
      this.socket.onopen = this.runRealTerminal
      this.socket.onclose = this.closeRealTerminal
      this.socket.onerror = this.errorRealTerminal
      this.term.attach(this.socket)
      this.term._initialized = true
      console.log('mounted is going on')
      this.connecting = true
    }
  },
  mounted () {
  },
  beforeDestroy () {
    if(this.socket) this.socket.close()
    if(this.term) this.term.destroy()
  }
}
</script>
<style>
  .terminal {
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
