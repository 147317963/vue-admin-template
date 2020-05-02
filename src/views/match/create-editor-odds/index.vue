<template>
    <div class="app-container">
        <div class="filter-container">
            <el-tooltip class="item" effect="light" content="创建玩法" placement="top-start">
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click.stop="handleCreate">
                创建
            </el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="light" content="导出xlsx" placement="top-start">
                <el-button v-waves  class="filter-item" type="primary" icon="el-icon-download" >
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


<!--        创建或者编辑-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" v-loading="listLoading" :rules="rules" :model="temp" label-position="left" label-width="90px">
                <el-form-item label="温馨提示：">
                    <el-tag>如果没有你创建的游戏或者赛事名称 团队等  联系客服添加即可  列表框可打字搜索</el-tag>
                </el-form-item>

                    <el-form-item label="游戏" prop="game_name">
                        <el-col :span="8">
                        <el-tooltip class="item" effect="light" content="游戏名称  创建后不可修改!"  placement="left">
                            <el-select filterable v-model="temp.game_name" class="filter-item" placeholder="游戏"  >
                                <el-option v-for="item in this.$store.getters.gameList" :disabled="item.status===2"  :key="item.id" :label="item.game_name" :value="item.game_name"  />
                            </el-select>
                        </el-tooltip>
                        </el-col>

                        <el-col :span="1" style="max-height: 29px">
                            <img style="width: 100%;height: 100%;margin: 0 auto"  v-lazy="$store.getters.gameList.length && temp.game_name?$store.getters.gameImgUrl+$store.getters.gameList[_.findIndex($store.getters.gameList,o=> o.game_name === temp.game_name)]['game_logo']:''"   >
                        </el-col>

                    </el-form-item>


                <el-form-item label="赛事名称" prop="tournament_name">
                    <el-tooltip class="item" effect="light" content="赛事名称  创建后不可修改!" placement="left">
<!--                    <el-input  v-model="temp.tournament_name" type="text" placeholder="赛事名称"  />-->
                        <el-select filterable v-model="temp.tournament_name" class="filter-item" placeholder="赛事名称"  >
                            <el-option  v-for="item in this.$store.getters.tournamentList" v-show="temp.game_name===item.game_name" :disabled="item.status===2"  :key="item.id" :label="item.tournament_name" :value="item.tournament_name"  />
                        </el-select>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="VS" prop="match_name">
                    <el-tooltip class="item" effect="light" content="团队VS团队  创建不可修改!" placement="left">
                    <el-input  v-model="temp.match_name" type="text" placeholder="VS"  />
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="bo" prop="round">
                    <el-tooltip class="item" effect="light" content="列如bo3 三局两胜 创建不可修改!" placement="left">
                        <el-select filterable v-model="temp.round" class="filter-item" placeholder="bo"  >
                            <el-option v-for="(item,index) in 9" :key="item.index" :label="'bo'+(index+1)" :value="'bo'+(index+1)"  />
                        </el-select>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="时间">
                    <el-col :span="8">
                        <el-form-item prop="start_time">
                            <el-tooltip class="item" effect="light" content="开启时间 赛事可能延迟 创建后可修改时间" placement="left">
                                <el-date-picker v-model="temp.start_time" type="datetime"  placeholder="开始比赛时间" style="width: 100%;"/>
                            </el-tooltip>
                        </el-form-item>

                    </el-col>
                    <el-col class="line" :span="4">-</el-col>
                    <el-col :span="8">
                        <el-form-item prop="end_time">
                            <el-tooltip class="item" effect="light" content="结束时间 赛事可能延迟 创建后可修改时间" placement="left">
                                <el-date-picker v-model="temp.end_time" type="datetime"  placeholder="结束比赛时间" style="width: 100%;"/>
                            </el-tooltip>
                        </el-form-item>
                    </el-col>
                </el-form-item>



                <el-form-item label="状态" prop="status">


                        <el-tooltip class="item"  effect="light" content="未开始:可以下注,滚盘中:可以下注,已结束:全局禁止下注,如果想限制某种玩法下注可以去赔率设置 可修改" placement="left">
<!--                            statusOptions[_.findIndex(statusOptions,o=> o.key === temp.status)].status_name-->
                            <el-select filterable  class="filter-item" v-model="temp.status" placeholder="状态"  >
                            <el-option v-for="item in statusOptions" :key="item.key" :label="item.status_name" :value="item.key" />
                            </el-select>
                        </el-tooltip>


                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    取消
                </el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">

                    {{dialogStatus==='create'?'创建':'确认'}}
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import { getMatchList } from '@/api/match'
    import waves from '@/directive/waves' // waves directive
    import Pagination from '@/components/Pagination' // 基于el-pagination的二级包

    export default {
        name: "index",
        directives: { waves },

        data() {
            return {
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
                //临时数据比赛数据
                temp: {
                        "id": undefined,
                        "game_id": undefined,
                        "game_name": "",
                        "live_url": "",
                        "match_name": "",
                        "match_short_name": "",
                        "round": "",
                        "status": 1,
                        "start_time": '',
                        "end_time": '',
                        "tournament_id": undefined,
                        "tournament_name": "",
                        "tournament_short_name": "",
                        "update_time": '',
                        "create_time": '',
                },
                //状态打开
                statusOptions: [
                    { key: 1, status_name: '未开始' },
                    { key: 2, status_name: '滚盘中' },
                    { key: 3, status_name: '已结束' },
                ],
                //是否显示
                dialogFormVisible: false,
                //添加还是编辑 this.dialogStatus = 'update'//更新
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                rules: {
                    match_name:[
                        { required: true, message: 'VS必须填写', trigger: 'blur' }
                    ],
                    status: [
                        { type: 'number',required: true, message: '状态必须填写', trigger: 'blur' },
                    ],
                    start_time: [{ required: true, message: '开始时间是必需的', trigger: 'change' }],
                    end_time: [{  required: true, message: '结束时间是必需的', trigger: 'change' }],
                    game_name: [{ required: true, message: '游戏是必需的', trigger: 'blur' }],
                    tournament_name:[{ required: true, message: '比赛名称是必需的', trigger: 'blur' }],
                    round:[
                        { required: true, message: 'bo是必需的', trigger: 'blur' },
                        { min: 3, max: 3, message: '长度在 3 个字符', trigger: 'blur' }
                    ]
                },
            }
        },
        methods: {//条用方法
            //获得比赛
            getData(){
                getMatchList(this.listQuery).then(response=>{
                    //返回数据
                 this.match = response.data.result;

                 this.listLoading = false

                })
            },
            //重置temp数据
            resetTemp() {
                this.temp = {
                    "id": undefined,
                    "game_id": undefined,
                    "game_name": "",
                    "live_url": "",
                    "match_name": "",
                    "match_short_name": "",
                    "round": "",
                    "status": 1,
                    "start_time": '',
                    "end_time": '',
                    "tournament_id": undefined,
                    "tournament_name": "",
                    "tournament_short_name": "",
                    "update_time": '',
                    "create_time": '',
                };
            },
            //点击创建
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    //https://element.eleme.cn/#/zh-CN/component/form
                    this.$refs['dataForm'].clearValidate()//移除表单项的校验结果
                })
            },
            //创建比赛
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    console.log(valid);
                    if (valid) {


                    }
                })
            },
            //点击编辑
             handleUpdate(row) {
                this.listLoading=true;
                this.temp = Object.assign({}, row); // 复制对象
                this.dialogStatus = 'update'; //切换为更新状态
                this.dialogFormVisible = true; //显示编辑框
                 this.listLoading=false;
                this.$nextTick(() => {
                    //https://element.eleme.cn/#/zh-CN/component/form
                    this.$refs['dataForm'].clearValidate();//移除表单项的校验结果
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
