<template>

</template>

<script>
    import ByuiChart from "@/plugins/echarts";
    export default {
        name: "index",
        data() {
            return {}

        },
        methods: {//条用方法
        },
        mounted() {//加载完毕后
        },
        beforeCreate() {//初始化前
        },
        beforeDestroy() {//组件销毁前
        },
        updated() {//更新数据
        },
        components: {//注册组件
            ByuiChart,
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
    .index-container {
        ::v-deep {
            .el-card__body {
                min-height: 200px;

                .echarts {
                    width: 100%;
                    height: 140px;
                }
            }
        }

        .card {
            ::v-deep {
                .el-card__body {
                    min-height: 390px;
                    height: auto;

                    .echarts {
                        width: 100%;
                        height: 350px;
                    }
                }
            }
        }

        .bottom {
            margin-top: 5px;
            height: 40px;
            padding-top: 20px;
            border-top: 1px solid $base-border-color;
            text-align: left;
            color: #595959;
        }

        .table {
            width: 100%;
            background-color: #fff;
            color: #666;
            border-collapse: collapse;

            td {
                border-width: 1px;
                border-style: solid;
                border-color: #e6e6e6;
                position: relative;
                padding: 9px 15px;
                min-height: 20px;
                line-height: 20px;
                font-size: 14px;

                &:first-child {
                    text-align: right;
                    width: 50%;
                }
            }
        }

        .bottom-btn {
            float: right;
            margin-top: 5px;

            button {
                margin: 5px 0 5px 10px;
            }
        }
    }
</style>
