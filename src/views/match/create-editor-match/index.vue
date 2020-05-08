<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input v-model="listQuery.game_name" placeholder="搜索游戏名称" style="width: 200px;" class="filter-item"
                      @keyup.enter.native="handleFilter"/>
            <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item" style="width: 130px">
                <el-option v-for="item in statusOptions" :key="item.key" :label="item.status_name" :value="item.key"/>
            </el-select>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                搜索
            </el-button>

            <el-tooltip class="item" effect="light" content="创建比赛" placement="top-start">
                <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                           @click.stop="handleCreate">
                    创建
                </el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="light" content="导出xlsx" placement="top-start">
                <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                           @click.stop="handleDownload">
                    导出
                </el-button>
            </el-tooltip>

            <!--            <el-checkbox v-model="show.id" class="filter-item" style="margin-left:15px;" >-->
            <!--                ID-->
            <!--            </el-checkbox>-->
            <!--            <el-checkbox v-model="show.game_name" class="filter-item" style="margin-left:15px;" >-->
            <!--                游戏-->
            <!--            </el-checkbox>-->
            <!--            <el-checkbox v-model="show.tournament_name" class="filter-item" style="margin-left:15px;" >-->
            <!--                比赛名称-->
            <!--            </el-checkbox>-->
            <!--            <el-checkbox v-model="show.match_name" class="filter-item" style="margin-left:15px;" >-->
            <!--                vs-->
            <!--            </el-checkbox>-->
            <!--            <el-checkbox v-model="show.round" class="filter-item" style="margin-left:15px;" >-->
            <!--                bo-->
            <!--            </el-checkbox>-->
            <!--            <el-checkbox v-model="show.start_time" class="filter-item" style="margin-left:15px;" >-->
            <!--                比赛开始-->
            <!--            </el-checkbox>-->
            <!--            <el-checkbox v-model="show.end_time" class="filter-item" style="margin-left:15px;" >-->
            <!--                比赛结束-->
            <!--            </el-checkbox>-->
            <!--            <el-checkbox v-model="show.status" class="filter-item" style="margin-left:15px;" >-->
            <!--                状态-->
            <!--            </el-checkbox>-->
        </div>


        <el-table
                :key="tableKey"
                v-loading="listLoading"
                ref="multipleTable"
                :data="list"

                fit
                highlight-current-row

                style="width: 100%"
        >
            <el-table-column v-if="show.id"
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
            <el-table-column v-if="show.game_name"
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
            <el-table-column v-if="show.tournament_name"
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
            <el-table-column v-if="show.match_name"
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
            <el-table-column v-if="show.round"
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
            <el-table-column v-if="show.start_time"
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
            <el-table-column v-if="show.end_time"
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
                    prop="status" v-if="show.status"
                    label="状态"
                    width="75"
                    align="center"
                    show-overflow-tooltip>
                <template slot-scope="{row}">
                    <div slot="reference" class="name-wrapper">
                        <el-tag v-if="row.status===1" style="color: #1989fa" size="medium">
                            未开始
                        </el-tag>
                        <el-tag v-if="row.status===2" style="color:#9da408" size="medium">
                            滚盘中
                        </el-tag>
                        <el-tag v-if="row.status===3" style="color: #ee0a24" size="medium">
                            已结束
                        </el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  fixed="right" label="操作" width="150" class-name="small-padding fixed-width">
                <template slot-scope="{row,$index}">
                    <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(row,$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--        分页-->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                    @pagination="getData()"/>
        <!--        创建或者编辑-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" v-loading="listLoading" :rules="rules" :model="temp" label-position="left"
                     label-width="90px">
                <el-form-item label="温馨提示：">
                    <el-tag>如果没有你创建的游戏或者赛事名称 团队等 联系客服添加即可 列表框可打字搜索</el-tag>
                </el-form-item>

                <el-form-item label="游戏" prop="game_name">
                    <el-col :span="7">
                            <el-select filterable v-model="temp.game_name" class="filter-item" placeholder="游戏名称创建后不可修改!"
                                       @change="temp.tournament_name='';
                                       temp['team'][0]['team_name']='';
                                       temp['team'][1]['team_name']='';
                                       temp.game_id=$store.getters.gameList.length?$store.getters.gameList[_.findIndex($store.getters.gameList,o=> o.game_name === temp.game_name)]['id']:temp.game_id;
                                       ">
                                <template v-for="item in this.$store.getters.gameList">
                                    <el-option  :disabled="item.status===2"
                                               :key="item.id" :label="item.game_name" :value="item.game_name"/>
                                </template>

                            </el-select>
                    </el-col>
                    <el-col :span="1" style="max-height: 29px"></el-col>
                    <el-col :span="1" style="max-height: 29px;margin-left: 5px;margin-top: 3px;">
                        <img style="width: 100%;height: 100%;background: #1c2236;"
                             v-lazy="$store.getters.gameList.length && temp.game_name?$store.getters.gameImgUrl+$store.getters.gameList[_.findIndex($store.getters.gameList,o=> o.game_name === temp.game_name)]['game_logo']:''">
                    </el-col>

                </el-form-item>


                <el-form-item label="赛事名称" prop="tournament_name">
                    <el-col :span="7">

                            <!--                    <el-input  v-model="temp.tournament_name" type="text" placeholder="赛事名称"  />-->
                            <el-select filterable v-model="temp.tournament_name" class="filter-item" placeholder="赛事名称创建后不可修改!"
                                       @change="temp.tournament_id=$store.getters.tournamentList.length?$store.getters.tournamentList[_.findIndex($store.getters.tournamentList,o=> o.tournament_name === temp.tournament_name)]['id']:temp.tournament_id;
                                   temp.tournament_short_name=$store.getters.tournamentList.length?$store.getters.tournamentList[_.findIndex($store.getters.tournamentList,o=> o.tournament_name === temp.tournament_name)]['tournament_short_name']:temp.tournament_short_name
                                  ">
                                <template v-for="item in this.$store.getters.tournamentList">
                                    <el-option
                                            v-show="temp.game_name===item.game_name" :disabled="item.status===2"
                                            :key="item.id" :label="item.tournament_name" :value="item.tournament_name"
                                    />
                                </template>

                            </el-select>
                    </el-col>

                </el-form-item>
                <el-form-item label="团队">
                    <el-col :span="7">
                        <el-form-item prop="team.0.team_name" v-if="Object.prototype.hasOwnProperty.call(temp['team'],0)">
                                <el-select filterable v-model="temp['team'][0]['team_name']" class="filter-item"
                                           placeholder="团队1创建不可修改!"
                                           @change="
                                  ">
                                    <template v-for="item in this.$store.getters.teamGroupList">
                                        <el-option
                                                v-show="temp.game_name===item.game_name" :disabled="item.status===2"
                                                :key="item.id" :label="item.team_name" :value="item.team_name"
                                        />
                                    </template>

                                </el-select>

                        </el-form-item>

                    </el-col>
                    <el-col :span="1" style="max-height: 29px;margin-left: 5px;margin-top: 3px;">
                        <img style="width: 100%;height: 100%;background: #1c2236;"
                             v-lazy="$store.getters.teamGroupList.length && Object.prototype.hasOwnProperty.call(temp['team'],0) && temp['team'][0]['team_name']?$store.getters.gameImgUrl+$store.getters.teamGroupList[_.findIndex($store.getters.teamGroupList,o=> o.team_name === temp['team'][0]['team_name'])]['team_logo']:''">
                    </el-col>
                    <el-col :span="3" style="text-align: center">-VS-</el-col>
                    <el-col :span="1" style="max-height: 29px;margin-right: 5px;margin-top: 3px;">
                        <img style="width: 100%;height: 100%;background: #1c2236;"
                             v-lazy="$store.getters.teamGroupList.length && Object.prototype.hasOwnProperty.call(temp['team'],1) && temp['team'][1]['team_name']?$store.getters.gameImgUrl+$store.getters.teamGroupList[_.findIndex($store.getters.teamGroupList,o=> o.team_name === temp['team'][1]['team_name'])]['team_logo']:''">
                    </el-col>
                    <el-col :span="7">
                          <el-form-item prop="team.1.team_name" v-if="Object.prototype.hasOwnProperty.call(temp['team'],1)">


                              <el-select filterable v-model="temp['team'][1]['team_name']" class="filter-item"
                                             placeholder="团队2创建不可修改"
                                             @change="
                                    ">
                                      <template v-for="item in this.$store.getters.teamGroupList">
                                          <el-option
                                                  v-show="temp.game_name===item.game_name" :disabled="item.status===2"
                                                  :key="item.id" :label="item.team_name" :value="item.team_name"
                                          />
                                      </template>
                                  </el-select>


                          </el-form-item>
                    </el-col>


                </el-form-item>
                <el-form-item label="bo" prop="round">
                    <el-col :span="7">

                        <el-select filterable v-model="temp.round" class="filter-item" placeholder="列如bo3 三局两胜 创建不可修改!">
                            <el-option v-for="(item,index) in 9" :key="item.index" :label="'bo'+(index+1)"
                                       :value="'bo'+(index+1)"/>
                        </el-select>

                    </el-col>
                </el-form-item>
                <el-form-item label="时间" >
                    <el-col :span="8">
                        <el-form-item prop="start_time">
                                <el-date-picker v-model="temp.start_time" type="datetime" placeholder="开启时间 赛事可能延迟 创建后可修改时间"
                                                value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"/>

                        </el-form-item>

                    </el-col>
                    <el-col class="line" :span="4" style="text-align: center"><----></el-col>
                    <el-col :span="8">
                        <el-form-item prop="end_time">

                                <el-date-picker v-model="temp.end_time" type="datetime" placeholder="结束时间 赛事可能延迟 创建后可修改时间"
                                                value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"/>

                        </el-form-item>
                    </el-col>
                </el-form-item>


                <el-form-item label="状态" prop="status">



                        <!--                            statusOptions[_.findIndex(statusOptions,o=> o.key === temp.status)].status_name-->
                        <el-select filterable class="filter-item" v-model="temp.status" placeholder="未开始:可以下注,滚盘中:可以下注,已结束:全局禁止下注,如果想限制某种玩法下注可以去赔率设置 可修改">
                            <el-option v-for="item in statusOptions" :key="item.key" :label="item.status_name"
                                       :value="item.key"/>
                        </el-select>



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
    import {getList, createMatch, uptateMatch} from '@/api/match'
    import waves from '@/directive/waves' // waves directive
    import Pagination from '@/components/Pagination'


    export default {
        name: "index",
        directives: {waves},

        data() {
            return {
                //开盘数据
                list: [],
                //列数
                tableKey: 0,
                //分页
                total: 0,
                listLoading: true,
                listQuery: {
                    page: 1,
                    limit: 20,
                    importance: undefined,
                    game_name: undefined,
                    status: undefined,
                    sort: 'id'
                },
                //临时数据比赛数据
                temp: {
                    "id": undefined,
                    "game_id": undefined,
                    "game_name": "",
                    "live_url": "",
                    "match_name": "",
                    "match_short_name": "",
                    "team": [
                        {
                            'id': undefined,
                            'match_id': undefined,
                            'pos': 1,
                            'team_group_id': undefined,
                            'team_logo': '',
                            'team_name': '',

                        },
                        {
                            'id': undefined,
                            'match_id': undefined,
                            'pos': 2,
                            'team_group_id': undefined,
                            'team_logo': '',
                            'team_name': '',

                        }
                    ],
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
                show: {
                    "id": true,
                    "game_name": true,
                    'tournament_name': true,
                    "match_name": true,
                    "round": true,
                    "status": true,
                    "start_time": true,
                    "end_time": true,

                },
                //下载
                downloadLoading: false,
                //状态打开
                statusOptions: [
                    {key: 1, status_name: '未开始'},
                    {key: 2, status_name: '滚盘中'},
                    {key: 3, status_name: '已结束'},
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
                    match_name: [
                        {required: true, message: 'VS必须填写', trigger: ['blur']}
                    ],
                    status: [
                        {type: 'number', required: true, message: '状态必须填写,创建后可修改', trigger: ['change']},
                    ],
                    start_time: [{required: true, message: '开始时间是必需的 创建后可修改', trigger: ['change']}],
                    end_time: [{required: true, message: '结束时间是必需的 创建后可修改', trigger: ['change']}],
                    game_name: [{required: true, message: '游戏是必需的 创建后不可修改', trigger: ['change']}],
                    tournament_name: [{required: true, message: '赛事名称是必需的 创建后不可修改', trigger: ['change']}],
                    team:[
                        {
                            team_name:[{required: true, message: '团队1名称 创建后不可修改', trigger: ['change']}]
                        },
                        {
                            team_name: [{required: true, message: '团队2名称 创建后不可修改', trigger: ['change']}],
                        }
                    ],
                    round: [
                        {required: true, message: 'bo是必需的 创建后不可修改', trigger: ['change']},
                        {min: 3, max: 3, message: '长度在 3 个字符', trigger: ['change']}
                    ]
                },
            }
        },
        methods: {//条用方法
            //获得比赛
            getData() {
                this.listLoading = true
                getList(this.listQuery).then(response => {
                    this.total = response.data.result.total;
                    //返回数据
                    this.list = response.data.result.data;
                    this.$nextTick(()=>{
                        this.listLoading = false
                    })



                })
            },
            //搜索
            handleFilter() {
                this.listQuery.page = 1
                this.getData()
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
                    "team": [
                        {
                            'id': undefined,
                            'match_id': undefined,
                            'pos': 1,
                            'team_group_id': undefined,
                            'team_logo': '',
                            'team_name': '',
                            'team_short_name': '',
                            "update_time": '',
                            "create_time": '',
                        },
                        {
                            'id': undefined,
                            'match_id': undefined,
                            'pos': 2,
                            'team_group_id': undefined,
                            'team_logo': '',
                            'team_name': '',
                            'team_short_name': '',
                            "update_time": '',
                            "create_time": '',
                        }
                    ],
                    "round": "",
                    "status": 1,
                    "start_time": '',
                    "end_time": '',
                    "tournament_id": undefined,
                    "tournament_name": "",
                    "tournament_short_name": "",
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
                    if (valid) {
                        //发送创建数据
                        createMatch(this.temp).then(response => {
                            //创建框关闭
                            this.dialogFormVisible = false
                            //向前面插入数据
                            this.$notify({
                                title: '成功',
                                message: response.data.message,
                                type: 'success',
                                duration: 2000
                            })
                            //重新获得数据
                            this.getData();
                        })
                    }
                })
            },
            //点击编辑
            handleUpdate(row) {
                this.listLoading = true;
                this.temp = Object.assign({}, this.clone(row)); // copy obj // 复制对象 会导致双向绑定
                this.dialogStatus = 'update'; //切换为更新状态
                this.dialogFormVisible = true; //显示编辑框
                this.listLoading = false;
                this.$nextTick(() => {
                    //https://element.eleme.cn/#/zh-CN/component/form
                    this.$refs['dataForm'].clearValidate();//移除表单项的校验结果
                })
            },
            //更新比赛
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const tempData = Object.assign({}, this.temp);
                        // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                        uptateMatch(tempData).then(() => {
                            //查询匹配的ID索引
                            // const index = this.list.findIndex(v => v.id === this.temp.id);
                            // this.list.splice(index, 1, this.temp)
                            //创建框关闭
                            this.dialogFormVisible = false
                            this.$notify({
                                title: '成功',
                                message: '更新 比赛成功',
                                type: 'success',
                                duration: 2000
                            })
                            //重新获得数据
                            this.getData();
                        })
                    }
                })
            },
            //导出
            handleDownload() {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = [
                        "id",
                        "game_name",
                        'tournament_name',
                        "match_name",
                        "round",
                        "status",
                        "start_time",
                        "end_time",
                    ]
                    const filterVal = [
                        "id",
                        "game_name",
                        'tournament_name',
                        "match_name",
                        "round",
                        "status",
                        "start_time",
                        "end_time",
                    ]
                    const data = this.formatJson(filterVal);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'table-match'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal) {
                return this.list.map(v => filterVal.map(j => {

                    return v[j]

                }))
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

<style lang="scss" scoped>
    .el-dialog{
        width: 600px;
    }
</style>
