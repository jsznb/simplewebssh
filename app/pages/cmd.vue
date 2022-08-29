<template>
  <div class="container">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1"><a href="/" target="_blank">Hosts</a></el-menu-item>
      <el-menu-item index="2"><a href="/cmd" target="_blank">Commands</a></el-menu-item>
      <el-menu-item index="3" @click="openRightDrawer({})">New</el-menu-item>
    </el-menu>
    <el-drawer
      title="编辑命令"
      :visible.sync="rdrawer"
      :direction="rtl">
      <el-form ref="form" :model="selRow" label-width="80px">
        <el-form-item label="Id">
          <el-input v-model="selRow.id"></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="selRow.name"></el-input>
        </el-form-item>
        <el-form-item label="Path">
          <el-input v-model="selRow.path"></el-input>
        </el-form-item>
        <el-form-item label="Cmd">
          <el-input v-model="selRow.cmd" type="textarea" autosize ></el-input>
        </el-form-item>
        <el-form-item label="Rule">
          <el-input v-model="selRow.rule" type="textarea" autosize ></el-input>
        </el-form-item>
        <el-form-item label="Serial">
          <el-input v-model="selRow.serial"></el-input>
        </el-form-item>
      </el-form>
      <el-button-group style="float: right;">
        <el-button @click="onSave('new')" type="success" size="mini" >New</el-button>
        <el-button @click="onSave('set')" type="primary" size="mini" >Set</el-button>
        <el-button @click="onSave('del')" type="danger" size="mini" >Del</el-button>
      </el-button-group>
    </el-drawer>
    <el-row>
      <el-col><el-input
        placeholder="Search Path"
        prefix-icon="el-icon-search"
        v-model="pathLike"
        @change="onSearch">
      </el-input></el-col>
    </el-row>
    <el-row>
      <el-table
        :data="hostTableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="ID">
        </el-table-column>
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
          prop="serial"
          label="Serial">
        </el-table-column>
        <el-table-column
          prop="cmd"
          label="Cmd">
        </el-table-column>
        <el-table-column
          prop="rule"
          label="Rule" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="create_at"
          label="CreateAt"
          :formatter="formatDate" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Opt">
          <template slot-scope="scope">
            <el-button @click="openRightDrawer(scope.row)" size="mini" >Edit/New/Del</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageCur"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="hostCount">
        </el-pagination>
      </div>
    </el-row>
  </div>

</template>

<script>
import axios from "axios"
export default {
  name: 'WebSSH',
  data () {
    return {
      rdrawer: false,
      hostTableData: [],
      hostCount: 1000,
      pathLike: '',
      pageSize: 20,
      pageCur: 1,
      selRow: {},
    }
  },
  methods: {
    onSearch() {
      axios.get(`/api/cmd/search`, { params: { path:`%${this.pathLike}%`,offset:(this.pageCur-1)*this.pageSize,limit:this.pageSize }}).then((res)=>{
        if(res.status!=200||res.data.code!=0) throw "Error: Query Data"
        this.hostTableData = res.data.data;
        this.hostCount = res.data.count;
      }).catch(console.log)
    },
    onSave(type) {
      switch(type) {
        case "del":
          axios.get(`/api/cmd/del`, { params: { id:this.selRow.id }}).then((res)=>{
            if(res.status!=200||res.data.code!=0) throw "Error: Query Data"
            this.onSearch()
          }).catch(console.log)
          break;
        case "new":
          axios.get(`/api/cmd/save`, { params: { path:this.selRow.path,name:this.selRow.name,serial:this.selRow.serial,cmd:this.selRow.cmd,rule:JSON.stringify(JSON.parse(this.selRow.rule)) }}).then((res)=>{
            if(res.status!=200||res.data.code!=0) throw "Error: Query Data"
            this.onSearch()
          }).catch(console.log)
          break;
        case "set":
          axios.get(`/api/cmd/save`, { params: { id:this.selRow.id,path:this.selRow.path,name:this.selRow.name,serial:this.selRow.serial,cmd:this.selRow.cmd,rule:JSON.stringify(JSON.parse(this.selRow.rule)) }}).then((res)=>{
            if(res.status!=200||res.data.code!=0) throw "Error: Query Data"
            this.onSearch()
          }).catch(console.log)
          break;
      }
    },
    formatDate(row,col,cellvalue,index) {
      return new Date(cellvalue).toUTCString()
    },
    newWindow(row) {
      window.open(`/term/?path=${row.path}`, "_blank");
    },
    openRightDrawer(row) {
      this.selRow = row
      this.rdrawer = true
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageCur = val
    }
  },
  mounted() {
    this.onSearch()
  }
}
</script>

<style scoped>
</style>
