<template>
    <div class="app-container">
        <div class="filter-container">
            <el-tooltip class="item" effect="light" content="添加比赛" placement="top-start">
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
                添加
            </el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="light" content="导出xlsx" placement="top-start">
                <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
                    导出
                </el-button>
            </el-tooltip>


        </div>


        <el-table
                v-loading="listLoading"
                ref="multipleTable"
                :data="match"
                border
                fit
                highlight-current-row

                style="width: 100%"
        >
            <el-table-column
                    label="ID"
                    align="center"
                    width="70"
            >
                <template slot-scope="{row}">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ row.id }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="游戏"
                    align="center"
                    width="100"
            >
                <template slot-scope="{row}">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{row.game_name }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="比赛名称"
                    align="center"
                    width="100"
            >
                <template slot-scope="{row}">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{row.tournament_name }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="VS"
                    align="center"
                    width="220"
            >
                <template slot-scope="{row}">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ row.match_name }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="bo"
                    align="center"
                    width="60"
            >
                <template slot-scope="{row}">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{row.round }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    label="比赛开始"
                    width="150"
                    align="center"
            >
                <template slot-scope="{row}">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{row.start_time }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    width="150"
                    label="比赛结束"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="{row}">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ row.end_time }}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="75"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="{row}">
                    <div slot="reference" class="name-wrapper">
                        <el-tag v-if="row.status===1" size="medium">
                            未开始
                        </el-tag>
                        <el-tag v-if="row.status===2" size="medium">
                            滚盘中
                        </el-tag>
                        <el-tag v-if="row.status===3" size="medium">
                            已结束
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="150" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(row,$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
                <el-form-item label="游戏">
                    <!--                        编辑状态无法更改游戏名称-->
                    <el-input v-if="dialogStatus==='update'" v-model="temp.game_name" type="text" placeholder="游戏名称"  :disabled="true"/>
                    <!--                        <el-select v-model="temp.type" class="filter-item" placeholder="Please select">-->
                    <!--                            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />-->
                    <!--                        </el-select>-->
                </el-form-item>
                <el-form-item label="比赛名称">
                    <el-input v-if="dialogStatus==='update'" v-model="temp.tournament_name" type="text" placeholder="比赛名称"  :disabled="true"/>
                </el-form-item>
                <el-form-item label="VS">
                    <el-input v-if="dialogStatus==='update'" v-model="temp.match_name" type="text" placeholder="VS"  :disabled="true"/>
                </el-form-item>
                <el-form-item label="bo">
                    <el-input v-if="dialogStatus==='update'" v-model="temp.round" type="text" placeholder="bo"  :disabled="true"/>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-input v-if="dialogStatus==='update'" v-model="temp.start_time" type="text" placeholder="开始比赛时间"  :disabled="true"/>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-input v-if="dialogStatus==='update'" v-model="temp.end_time" type="text" placeholder="结束比赛时间"  :disabled="true"/>
                </el-form-item>
                <el-form-item label="状态">
                    <el-tooltip class="item" effect="light" content="未开始:可以下注,滚盘中:可以下注,已结束:全局禁止下注,如果想限制某种玩法下注可以去赔率设置" placement="top-start">
                        <el-input  v-model="temp.status" type="text" placeholder="比赛状态"  />
                    </el-tooltip>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
                    确认
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getMatchList } from '@/api/match'
    import { getGameList } from '@/api/game'
    import waves from '@/directive/waves' // waves directive
    import Pagination from '@/components/Pagination' // 基于el-pagination的二级包
    export default {
        name: "index",
        directives: { waves },
        data() {
            return {
                //游戏列表
                game:[],
                //开盘数据
                match:[],
                listLoading:true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    sort: '+id'
                },
                //临时数据
                temp: {
                    id: undefined,
                    gmae_name:'',
                    tournament_name: '',
                    match_name:'',
                    round: '',
                    start_time: '',
                    end_time: '',
                    status: ''
                },
                //是否显示
                dialogFormVisible: false,
                //添加还是编辑 this.dialogStatus = 'update'//更新
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                rules: {
                    status: [{ required: true, message: '状态是必需的', trigger: 'change' }],
                    start_time: [{ type: 'date', required: true, message: '开始时间是必需的', trigger: 'change' }],
                    end_time: [{ type: 'date', required: true, message: '结束时间是必需的', trigger: 'change' }],
                    gmae_name: [{ required: true, message: '游戏是必需的', trigger: 'blur' }],
                    tournament_name:[{ required: true, message: '比赛名称是必需的', trigger: 'blur' }],
                    round:[{ required: true, message: 'bo是必需的', trigger: 'blur' }]
                },
            }
        },
        methods: {//条用方法
            //获得比赛
            getData(){
                getMatchList(this.listQuery).then(response=>{
                    //返回数据
                 this.match = response.data.result;
                 //延迟
                    setTimeout(() => {
                        this.listLoading = false
                    }, 1.5 * 1000)
                })
            },
            //创建比赛
            createData() {
                // this.$refs['dataForm'].validate((valid) => {
                //     if (valid) {
                //         this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
                //         this.temp.author = 'vue-element-admin'
                //         createArticle(this.temp).then(() => {
                //             this.list.unshift(this.temp)
                //             this.dialogFormVisible = false
                //             this.$notify({
                //                 title: 'Success',
                //                 message: 'Created Successfully',
                //                 type: 'success',
                //                 duration: 2000
                //             })
                //         })
                //     }
                // })
            },
            //点击编辑
            handleUpdate(row) {
                this.temp = Object.assign({}, row) // 复制对象
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            //更新比赛
            updateData() {
                // this.$refs['dataForm'].validate((valid) => {
                //     if (valid) {
                //         const tempData = Object.assign({}, this.temp)
                //         tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                //         updateArticle(tempData).then(() => {
                //             const index = this.list.findIndex(v => v.id === this.temp.id)
                //             this.list.splice(index, 1, this.temp)
                //             this.dialogFormVisible = false
                //             this.$notify({
                //                 title: 'Success',
                //                 message: 'Update Successfully',
                //                 type: 'success',
                //                 duration: 2000
                //             })
                //         })
                //     }
                // })
            },

        },
        mounted() {//加载完毕后
            this.getData();
        },
        beforeCreate() {//初始化前
        },
        beforeDestroy() {//组件销毁前
        },
        updated() {//更新数据
        },
        components: {//注册组件
            Pagination
        },
        watch: {
            //data(val, newval) {
            //console.log(val)
            //console.log(newval)
            //}
        }
    }
</script>

<style scoped>

</style>
