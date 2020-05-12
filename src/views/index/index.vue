<template>
    <el-row :gutter="15">

            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-card class="card" shadow="never" >
                    <div slot="header" >
                        <span>公告</span>
                    </div>
                    <el-timeline >
                        <el-timeline-item
                                v-for="(item, index) in list"
                                :key="index"
                                :timestamp="item.create_time"
                                :color="item.color"

                        >

                            {{ item.cn_body }}
                        </el-timeline-item>
                    </el-timeline>
                </el-card>
            </el-col>


    </el-row>

</template>

<script>
    import {getList} from '@/api/announcement'
    export default {
        name: "index",
        data() {
            return {
                list:[],
            }

        },
        methods: {//条用方法
            getData() {
                getList().then(res => {
                    res.data.result.data.map((item, index) => {
                        if (index === 0) {
                            item.color = "#0bbd87";
                        }
                    });
                    this.list = res.data.result.data;


                })
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

</style>
