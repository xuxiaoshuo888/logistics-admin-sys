<template>
    <el-container>
        <el-aside with="150px">
            <el-scrollbar class="scrollbar">
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#2d3a4b"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">订单管理</span>
                    </el-menu-item>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header class="header-style">
                <div class="header-div">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-dropdown>
                        <div style="cursor: pointer;">
                            <el-avatar
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-setting" @click="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main class="main-style">
                <div class="search-area">
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入订单号"
                                    v-model="order_number"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入订单状态"
                                    v-model="order_state"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入用户的手机号"
                                    v-model="user_phone"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="按照该日期之后查询"
                                    v-model="gte"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-input
                                    placeholder="按照该日期之前查询"
                                    v-model="lte"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="发货人手机"
                                    v-model="consigner_phone"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入发货省"
                                    v-model="delivery_province"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入发货市"
                                    v-model="delivery_city"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入发货区"
                                    v-model="deliver_county"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入收货人手机"
                                    v-model="consignee_phone"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入收货省"
                                    v-model="receipt_province"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入收货市"
                                    v-model="receipt_city"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入收货区"
                                    v-model="receipt_county"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="result-area">
                    <el-table
                            :data="tableData"
                            max-height="500px"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="order_number"
                                label="订单号"
                                width="170">
                        </el-table-column>
                        <el-table-column
                                prop="consigner"
                                label="发货人"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="consigner_phone"
                                label="发货人电话"
                                width="140">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_province"
                                label="发货省"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_city"
                                label="发货市"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_district"
                                label="发货区"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_address"
                                label="发货地址"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="consignee"
                                label="收货人"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="consignee_phone"
                                label="收货人电话"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="receipt_province"
                                label="收货省"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="receipt_city"
                                label="收货市"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="receipt_district"
                                label="收货区"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="receipt_address"
                                label="收货地址"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="furniture_category"
                                label="家具类别"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="goods_number"
                                label="货物件数"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="goods_volume"
                                label="货物体积(m³)"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="transport_prices"
                                label="运输价格(元)"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_method"
                                label="送货方式"
                                width="120">
                            <template slot-scope="scope">
                                {{scope.row.delivery_method==1?'自提':''}}
                                {{scope.row.delivery_method==2?'送货到楼下':''}}
                                {{scope.row.delivery_method==3?'送货到家':''}}
                                {{scope.row.delivery_method==4?'送货并安装':''}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="pay_method"
                                label="付款方式"
                                width="120">
                            <template slot-scope="scope">
                                {{scope.row.pay_method==1?'现付':''}}
                                {{scope.row.pay_method==2?'转账':''}}
                                {{scope.row.pay_method==3?'到付':''}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
                                <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="70%"
                        :before-close="handleClose">
                    <span>这是一段信息</span>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>


</template>

<script>
    export default {
        name: "layout",
        data() {
            return {
                order_number: '',//	根据订单号查询
                order_state: '',//	根据订单状态查询   1:已下单  2:已提货  3:已完成  4:已取消
                user_phone: '',//	根据用户的手机号查询
                gte: '',//	查询大于等于该日期的订单   格式:”2020/05/18”
                lte: '',//	查询小于等于该日期的订单   格式同gte
                consigner_phone: '',//	根据发货人手机查询订单
                delivery_province: '',//根据发货省查询订单
                delivery_city: '',//	根据发货市查询订单
                deliver_county: '',//根据发货区查询订单
                consignee_phone: '',//	根据收货人手机查询订单
                receipt_province: '',//	根据收货省查询订单
                receipt_city: '',//	根据收货市查询订单
                receipt_county: '',//	根据收货区查询订单
                tableData: [],
                dialogVisible: true,
                start: '',//开始
                end: '',//结束
                count: '',//总条数
            }
        },
        mounted() {
            this.search();
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            logout() {
                this.request.post('/admin/logout/', {}).then(res => {
                    //登出成功之后跳转到login
                    debugger
                    if (res.data.ret == 0) {
                        this.$router.push('/login')
                    }
                })
            },
            search() {
                let data = {
                    order_number: '',//	根据订单号查询
                    order_state: '',//	根据订单状态查询   1:已下单  2:已提货  3:已完成  4:已取消
                    user_phone: '',//	根据用户的手机号查询
                    gte: '',//	查询大于等于该日期的订单   格式:”2020/05/18”
                    lte: '',//	查询小于等于该日期的订单   格式同gte
                    consigner_phone: '',//	根据发货人手机查询订单
                    delivery_province: '',//根据发货省查询订单
                    delivery_city: '',//	根据发货市查询订单
                    deliver_county: '',//根据发货区查询订单
                    consignee_phone: '',//	根据收货人手机查询订单
                    receipt_province: '',//	根据收货省查询订单
                    receipt_city: '',//	根据收货市查询订单
                    receipt_county: '',//	根据收货区查询订单
                }
                this.request.get('/admin/get/', data).then(res => {
                    if (res.data.ret == 0) {
                        this.tableData = res.data.data;
                        this.start = res.data.start;
                        this.end = res.data.end;
                        this.count = res.data.count;
                    } else if (res.data.ret == -1 && res.data.data == '未登录') {
                        this.$router.push('/login')
                    }
                })
            },
            del(e) {
                this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.request.post('/admin/delete/', {order_number: e.order_number}).then(res => {
                        //登出成功之后跳转到login
                        if (res.data.ret == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.search();
                        }else{
                            this.$message({
                                type: 'error',
                                message: res.data.data
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            edit(e) {
                console.log(e)

            }

        }
    }
</script>

<style scoped lang="scss">
    /*@import '/assets/scss/all.scss';*/
    .el-aside {
        height: 100vh;
        background-color: $aside-bg-color;
    }

    .scrollbar {
    }

    .header-style {
        border-bottom: 1px solid #bfbfbf;
    }

    .header-div {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .search-area > .el-row {
        margin-bottom: 10px;
    }

    .search-area {
        margin-bottom: 10px;
    }

    .main-style {
        height: calc(100vh - 60px);
        overflow-y: scroll;
    }
</style>