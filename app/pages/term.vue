<template>
  <div class="container">
    <el-menu mode="horizontal">
      <el-menu-item index="2"><a href="/" target="_blank">Hosts</a></el-menu-item>
      <el-menu-item index="3"><a href="/cmd" target="_blank">Commands</a></el-menu-item>
    </el-menu>
    <el-row>
      <el-col span="2"><el-breadcrumb separator="/" style="padding-top: 6px;">
        <el-breadcrumb-item>ssh</el-breadcrumb-item>
        <el-breadcrumb-item>test</el-breadcrumb-item>
      </el-breadcrumb></el-col>
      <el-col span="22"><el-button-group style="float:right;">
        <el-button size="mini" @click="onConnect">连接</el-button>
        <el-button size="mini" @click.native="newWindow('host')">主机管理</el-button>
        <el-button size="mini" @click.native="newWindow('cmd')">命令管理</el-button>
        <el-button size="mini" @click.native="newWindow('log')">执行日志</el-button>
      </el-button-group></el-col>
    </el-row>
    <Console ref="console" :terminal="terminal"></Console>
    <el-input ref="searchCmd" type="textarea" autosize placeholder="COMMAND" v-model="cmdin" clearable @keyup.native="onKeyEvent" @input="onSearch"> </el-input>
    <el-row >
      <el-table
        :data="hostTableData"
        border
        @row-click="onSelectCmd"
        style="width: 100%">
        <el-table-column
          fixed
          prop="path"
          label="Path">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Name">
        </el-table-column>
        <el-table-column
          prop="cmd"
          label="Cmd">
        </el-table-column>
        <el-table-column
          prop="rule"
          label="Rule" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-row>
  </div>

</template>

<script>
import axios from "axios"
export default {
  name: 'WebSSH',
  data () {
    return {
      host: {
        name: '',
        path: '',
      },
      terminal: {
        pid: 1,
        name: 'terminal',
        cols: 400,
        rows: 400
      },
      lastcmd: '',
      cmdin: '',
      ldrawer: false,
      rdrawer: false,
      timeout:  null,
      hostTableData: [],
    }
  },
  methods: {
    onSearch() {
      let tmp = this.cmdin
      if(tmp.length > 10||tmp.length < 2) return
      if(!/^@/.test(tmp)) return
      tmp = tmp.substring(1)
      axios.get(`/api/cmd/search`, { params: { path:`%${tmp}%`,offset:0,limit:10 }}).then((res)=>{
        if(res.status!=200||res.data.code!=0) throw "Error: Query Data"
        this.hostTableData = res.data.data;
        this.hostCount = res.data.count;
      }).catch(console.log)
    },
    onKeyEvent(event) {
      if(event.altKey||event.ctrlKey) {
        switch(event.key) {
          case 'Enter':
            if(this.cmdin=='') return
            this.lastcmd = this.cmdin
            this.cmdin += '\n'
            this.$refs.console.socket.send(this.cmdin)
            this.cmdin = ''
            break;
          case 'Backspace':
            if(this.cmdin!='') this.lastcmd = this.cmdin
            this.cmdin = ''
            break;
          case 'ArrowUp':
            if(this.cmdin!='') this.lastcmd = this.cmdin
            this.cmdin = ''
            this.$refs.console.socket.send('[A')
            break;
          case 'ArrowDown':
            if(this.cmdin!='') this.lastcmd = this.cmdin
            this.cmdin = ''
            this.$refs.console.socket.send('[B')
            break;
          case 'z':
            if(this.cmdin=='')this.cmdin = this.lastcmd
            break;
        }
      }
    },
    onSelectCmd(row, column, event) {
      this.cmdin = row.cmd
      this.hostTableData = []
      this.$refs.searchCmd.focus()
    },
    newWindow(type) {
      switch(type) {
        case 'host':window.open(`/?path=${this.host.path}`, "_blank"); break;
        case 'cmd':window.open(`/cmd`, "_blank"); break;
        case 'log':window.open(`/hostlog?path=${this.host.path}`, "_blank"); break;
      }
    },
    onConnect() {
      if(this.$route.query&&this.$route.query.path) {
        this.host.path = this.$route.query.path
        this.$refs.console.connect(this.host.path)
      } else {
        this.$refs.console.connect('unknown')
      }
    },
  },
  mounted() {
    this.onConnect()
  }
}
</script>

<style scoped>
</style>
