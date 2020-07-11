<template>
    <el-container>
        <el-aside width="150px">
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
                    <el-dropdown @command="handleCommand">
                        <div style="cursor: pointer;" class="portarit-div">

                            <el-avatar style="margin-right: 10px;"
                                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">

                            </el-avatar>
                            管理员
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-setting" command="logout">退出</el-dropdown-item>
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
                                    @input="search_condition_onchange"
                                    v-model="order_number"
                                    size="small"
                                    clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-cascader
                                    style="width: 100%;"
                                    v-model="s_fhd"
                                    :options="list"
                                    size="small"
                                    placeholder="请选择发货省市区"
                                    clearable
                                    @change="search_fhd"></el-cascader>
                        </el-col>
                        <el-col :span="6">
                            <el-date-picker
                                    v-model="gte"
                                    type="date"
                                    size="small"
                                    @change="search_condition_onchange"
                                    clearable
                                    style="width: 100%;"
                                    value-format="yyyy/MM/dd"
                                    placeholder="按照该日期之后查询">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入发货人电话"
                                    v-model="consigner_phone"
                                    size="small"
                                    @input="search_condition_onchange"
                                    clearable>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-select v-model="order_state" placeholder="请选择订单状态" style="width: 100%;" size="small"
                                       @change="search_condition_onchange" clearable>
                                <el-option v-for="(item,index) in order_state_list" :label="item.name"
                                           :value="item.val" :key="index"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6">
                            <el-cascader
                                    style="width: 100%;"
                                    v-model="s_shd"
                                    :options="list"
                                    size="small"
                                    placeholder="请选择收货省市区"
                                    clearable
                                    @change="search_shd"></el-cascader>
                        </el-col>
                        <el-col :span="6">

                            <el-date-picker
                                    v-model="lte"
                                    type="date"
                                    size="small"
                                    clearable
                                    @change="search_condition_onchange"
                                    style="width: 100%;"
                                    value-format="yyyy/MM/dd"
                                    placeholder="按照该日期之前查询">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="6">
                            <el-input
                                    placeholder="请输入收货人电话"
                                    v-model="consignee_phone"
                                    size="small"
                                    @input="search_condition_onchange"
                                    clearable>
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24" style="text-align: center;">
                            <el-button type="primary" icon="el-icon-search" size="small" @click="search">查询</el-button>
                            <el-button type="success" icon="el-icon-refresh" size="small" @click="resetAll">重置
                            </el-button>
                            <el-button type="success" icon="el-icon-download" size="small" @click="exportByConditions">
                                按查询条件导出
                            </el-button>
                            <el-button type="success" icon="el-icon-download" size="small" @click="exportBySelected">
                                导出选中项
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="result-area">
                    <el-table
                            :data="tableData"
                            max-height="500px"
                            border
                            stripe
                            size="mini"
                            style="width: 100%;"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55"
                                align="center"
                                fixed="left"
                                header-align="center">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                header-align="center"
                                prop="order_number"
                                label="订单号"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="order_state"
                                label="订单状态"
                                align="center"
                                header-align="center"
                                width="100">
                            <template slot-scope="scope">
                                <el-tag type="" size="mini" v-if="scope.row.order_state==1">
                                    {{scope.row.order_state==1?'已下单':''}}
                                </el-tag>
                                <el-tag type="success" size="mini" v-if="scope.row.order_state==2">
                                    {{scope.row.order_state==2?'已提货':''}}
                                </el-tag>
                                <el-tag type="info" size="mini" v-if="scope.row.order_state==3">
                                    {{scope.row.order_state==3?'已到直达点':''}}
                                </el-tag>
                                <el-tag type="" size="mini" v-if="scope.row.order_state==4">
                                    {{scope.row.order_state==4?'已中转':''}}
                                </el-tag>
                                <el-tag type="success" size="mini" v-if="scope.row.order_state==5">
                                    {{scope.row.order_state==5?'已到站':''}}
                                </el-tag>
                                <el-tag type="danger" size="mini" v-if="scope.row.order_state==6">
                                    {{scope.row.order_state==6?'已完成':''}}
                                </el-tag>
                                <el-tag type="warning" size="mini" v-if="scope.row.order_state==7">
                                    {{scope.row.order_state==7?'已取消':''}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="order_time"
                                label="下单时间"
                                align="center"
                                header-align="center"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="consigner"
                                label="发货人"
                                align="center"
                                header-align="center"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="consigner_phone"
                                label="发货人电话"
                                align="center"
                                header-align="center"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_province"
                                label="发货省"
                                align="center"
                                header-align="center"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_city"
                                label="发货市"
                                align="center"
                                header-align="center"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_district"
                                label="发货区"
                                align="center"
                                header-align="center"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_address"
                                label="发货地址"
                                align="center"
                                header-align="center"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="consignee"
                                label="收货人"
                                align="center"
                                header-align="center"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="consignee_phone"
                                label="收货人电话"
                                align="center"
                                header-align="center"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="receipt_province"
                                label="收货省"
                                align="center"
                                header-align="center"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="receipt_city"
                                label="收货市"
                                align="center"
                                header-align="center"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="receipt_district"
                                label="收货区"
                                align="center"
                                header-align="center"
                                width="">
                        </el-table-column>
                        <el-table-column
                                prop="receipt_address"
                                label="收货地址"
                                align="center"
                                header-align="center"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="furniture_category"
                                label="家具类别"
                                show-overflow-tooltip
                                align="center"
                                header-align="center"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                prop="goods_number"
                                label="货物件数"
                                align="center"
                                header-align="center"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="goods_volume"
                                label="货物体积(m³)"
                                align="center"
                                header-align="center"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="transport_prices"
                                label="运输价格(元)"
                                align="center"
                                header-align="center"
                                width="90">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_method"
                                label="送货方式"
                                align="center"
                                header-align="center"
                                width="100">
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
                                align="center"
                                header-align="center"
                                width="80">
                            <template slot-scope="scope">
                                {{scope.row.pay_method==1?'现付':''}}
                                {{scope.row.pay_method==2?'转账':''}}
                                {{scope.row.pay_method==3?'到付':''}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                align="center"
                                header-align="center"
                                width="150">
                            <template slot-scope="scope">
                                <el-button @click="del(scope.row)" type="danger" size="mini">删除</el-button>
                                <el-button @click="toEdit(scope.row)" type="primary" size="mini">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="fy-div">
                    <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage1"
                            layout="total,prev, pager, next,sizes"
                            :page-sizes="pageSizeList"
                            :page-size="pageSize"
                            :total="count">
                    </el-pagination>
                </div>
                <el-dialog
                        title="修改订单"
                        :visible.sync="dialogVisible"
                        width="80%">
                    <div class="dialog-content">
                        <el-form ref="form" :model="form" label-width="100px" size="small">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item label="订单号">
                                        <el-input v-model="form.order_number" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item label="下单时间">
                                        <el-input v-model="form.order_time" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item label="订单状态">
                                        <el-select v-model="form.order_state" placeholder="订单状态" style="width: 100%;">
                                            <el-option v-for="(item,index) in order_state_list" :label="item.name"
                                                       :value="item.val" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="发货人">
                                        <el-input v-model="form.consigner"></el-input>
                                    </el-form-item>
                                    <el-form-item label="发货人电话">
                                        <el-input v-model="form.consigner_phone" type="number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="发货省市区">
                                        <el-cascader
                                                style="width: 100%;"
                                                v-model="value_fhd"
                                                :options="list"
                                                @change="handleChange_fhd"></el-cascader>
                                    </el-form-item>
                                    <el-form-item label="发货地址">
                                        <el-input type="text" v-model="form.delivery_address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="收货人">
                                        <el-input v-model="form.consignee"></el-input>
                                    </el-form-item>
                                    <el-form-item label="收货人电话">
                                        <el-input v-model="form.consignee_phone" type="number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="收货省市区">
                                        <el-cascader
                                                style="width: 100%;"
                                                v-model="value_shd"
                                                :options="list"
                                                @change="handleChange_shd"></el-cascader>
                                    </el-form-item>
                                    <el-form-item label="收货地址">
                                        <el-input type="text" v-model="form.receipt_address"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="家具类别">
                                        <el-checkbox-group v-model="jjpl" @change="change_jjpl">
                                            <el-checkbox v-for="(item,index) in jjlb_list" :key="index"
                                                         :label="item"></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                    <el-form-item label="货物件数">
                                        <el-input-number v-model="form.goods_number" :min="1"
                                                         label="123"></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="货物体积(m³)">
                                        <el-input-number v-model="form.goods_volume" :min="0.1"
                                                         :step="0.1" label="描述文字"></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="运输价格(元)">
                                        <el-input-number v-model="form.transport_prices" :min="0.1"
                                                         :step="0.1" label="描述文字"></el-input-number>
                                        <el-button type="primary" @click="calcPrice" size="small"
                                                   style="margin-left: 10px">
                                            自动计算
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item label="送货方式">
                                        <el-select v-model="form.delivery_method" placeholder="送货方式">
                                            <el-option v-for="(item,index) in deli_method_list" :label="item.name"
                                                       :value="item.val" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="付款方式">
                                        <el-select v-model="form.pay_method" placeholder="送货方式">
                                            <el-option v-for="(item,index) in pay_method_list" :label="item.name"
                                                       :value="item.val" :key="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer" style="text-align: center">
                        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                        <el-button type="primary" @click="submitEdit" size="small">提交修改</el-button>
                    </span>
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import arealist from './area'
    import {setCookie, getCookie, clearCookie} from '../utils/utils'

    const fileDownload = require('js-file-download')
    export default {
        name: "layout",
        data() {
            return {
                arealist: arealist,
                list: [],//
                UEM: '',//价格因子
                //查询用
                order_number: '',//	根据订单号查询
                order_state: '',//	根据订单状态查询   1:已下单  2:已提货  3:已完成  4:已取消
                gte: '',//	查询大于等于该日期的订单   格式:”2020/05/18”
                lte: '',//	查询小于等于该日期的订单   格式同gte
                consigner_phone: '',//	根据发货人手机查询订单
                delivery_province: '',//根据发货省查询订单
                delivery_city: '',//	根据发货市查询订单
                deliver_district: '',//根据发货区查询订单
                consignee_phone: '',//	根据收货人手机查询订单
                receipt_province: '',//	根据收货省查询订单
                receipt_city: '',//	根据收货市查询订单
                receipt_district: '',//	根据收货区查询订单

                s_fhd: '',//搜索-发货地省市区
                s_shd: '',//搜索-收货地省市区
                tableData: [],
                dialogVisible: false,

                count: 0,//总条数
                deli_method_list: [
                    {name: '自提', val: 1},
                    {name: '送货到楼下', val: 2},
                    {name: '送货到家', val: 3},
                    {name: '送货并安装', val: 4}
                ],
                pay_method_list: [
                    {name: '现付', val: 1},
                    {name: '转账', val: 2},
                    {name: '到付', val: 3}
                ],
                order_state_list: [
                    {name: '已下单', val: 1},
                    {name: '已提货', val: 2},
                    {name: '已到直达点', val: 3},
                    {name: '已中转', val: 4},
                    {name: '已到站', val: 5},
                    {name: '已完成', val: 6},
                    {name: '已取消', val: 7}
                ],
                jjlb_list: ['普通沙发', '欧式沙发', '软床', '欧式床', '床垫', '整装柜类', '整装茶几', '餐桌', '椅子', '梳妆台', '其他', '普通床', '儿童上下床', '衣柜', '拆装柜类', '拆装茶几', '拆装梳妆台', '其他办公家具', '办公家具'],//家具类别
                form: {//修改提交表单用
                    order_number: '',//	订单号
                    order_time: '',//下单时间
                    order_state: '',//订单状态
                    consigner: '',//	发货人
                    consigner_phone: '',// 发货人电话
                    delivery_province: '',// 发货省
                    delivery_city: '',//		发货市
                    delivery_district: '',//	发货区
                    delivery_address: '',//	发货地址
                    consignee: '',//		收货人
                    consignee_phone: '',//收货人电话
                    receipt_province: '',//	收货省
                    receipt_city: '',//	收货市
                    receipt_district: '',//	收货区
                    receipt_address: '',//	收货地址
                    furniture_category: '',//家具类别
                    goods_number: '',//	货物件数
                    goods_volume: '',//   货物体积
                    transport_prices: '',//运输价格
                    delivery_method: '',//	送货方式
                    pay_method: '',//	付款方式
                },
                value_fhd: '',//发货地省市区
                value_shd: '',//收货地省市区
                jjpl: [],
                start: 0,//开始
                end: 10,//结束
                currentPage1: 1,//当前页码
                pageSize: 10,//每页数
                pageSizeList: [10, 20, 30],//页码选择列表
                orderNumberList: [],//选中列表订单数组
            }
        },
        mounted() {
            this.formatArealist();//处理地区数据格式
            this.search();

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            logout() {//登出
                this.request.get('/admin/logout/', {}).then(res => {
                    //登出成功之后跳转到login
                    if (res.data.ret == 0) {
                        clearCookie('sessionid')
                        this.$router.push('/login')
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.data
                        });
                    }
                })
            },
            search() {//查询
                this.$loading();
                let data = {
                    order_number: this.order_number,//	根据订单号查询
                    order_state: this.order_state,//	根据订单状态查询   1:已下单  2:已提货  3:已完成  4:已取消
                    gte: this.gte,//	查询大于等于该日期的订单   格式:”2020/05/18”
                    lte: this.lte,//	查询小于等于该日期的订单   格式同gte
                    consigner_phone: this.consigner_phone,//	根据发货人手机查询订单
                    delivery_province: this.delivery_province,//根据发货省查询订单
                    delivery_city: this.delivery_city,//	根据发货市查询订单
                    deliver_district: this.deliver_district,//根据发货区查询订单
                    consignee_phone: this.consignee_phone,//	根据收货人手机查询订单
                    receipt_province: this.receipt_province,//	根据收货省查询订单
                    receipt_city: this.receipt_city,//	根据收货市查询订单
                    receipt_district: this.receipt_district,//	根据收货区查询订单
                    start: this.start,
                    end: this.end
                }
                console.log('version:1.0.0')
                this.request.get('/admin/get/', {params: data}).then(res => {
                    this.$loading().close()
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
            del(e) {//删除
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
                        } else {
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
            toEdit(e) {//打开编辑模态框
                console.log(e)
                /*
                 order_number: '',//	订单号
                  consigner: '',//	发货人
                  consigner_phone: '',// 发货人电话
                  delivery_province: '',// 发货省
                  delivery_city: '',//		发货市
                  delivery_district: '',//	发货区
                  delivery_address: '',//	发货地址
                  consignee: '',//		收货人
                  consignee_phone: '',//收货人电话
                  receipt_province: '',//	收货省
                  receipt_city: '',//	收货市
                  receipt_district: '',//	收货区
                  receipt_address: '',//	收货地址
                  furniture_category: '',//家具类别
                  goods_number: '',//	货物件数
                  goods_volume: '',//   货物体积
                  transport_prices: '',//运输价格
                  delivery_method: '',//	送货方式
                  pay_method: '',//	付款方式
                 */
                this.dialogVisible = true
                this.form.order_number = e.order_number;
                this.form.order_time = e.order_time;
                this.form.order_state = e.order_state;
                this.form.consigner = e.consigner;
                this.form.consigner_phone = e.consigner_phone;
                this.form.delivery_province = e.delivery_province;
                this.form.delivery_city = e.delivery_city;
                this.form.delivery_district = e.delivery_district;
                this.form.delivery_address = e.delivery_address;
                this.form.consignee = e.consignee;
                this.form.consignee_phone = e.consignee_phone;
                this.form.receipt_province = e.receipt_province;
                this.form.receipt_city = e.receipt_city;
                this.form.receipt_district = e.receipt_district;
                this.form.receipt_address = e.receipt_address;
                this.form.furniture_category = e.furniture_category;
                this.jjpl = e.furniture_category.split(',');
                this.form.goods_number = e.goods_number;
                this.form.goods_volume = e.goods_volume;
                this.form.transport_prices = e.transport_prices;
                this.form.delivery_method = e.delivery_method;
                this.form.pay_method = e.pay_method;
                this.value_fhd = [this.form.delivery_province, this.form.delivery_city, this.form.delivery_district];
                this.value_shd = [this.form.receipt_province, this.form.receipt_city, this.form.receipt_district];
                console.log(this.form)
                this.getUEM();
            },
            formatArealist() {//处理JSON数据，符合element 级联组件数据格式
                let obj = this.arealist;
                console.log(obj)
                let list = [];
                for (let key in obj) {
                    let obj_temp1 = {
                        value: key,
                        label: key,
                        children: []
                    }
                    list.push(obj_temp1)
                    for (let key_son in obj[key]) {
                        let obj_temp2 = {
                            value: key_son,
                            label: key_son,
                            children: []
                        }
                        list.forEach((item, index) => {
                            if (item.label == key) {
                                item.children.push(obj_temp2)
                            }
                        })
                        let temp_list = []
                        obj[key][key_son].forEach((qu, index) => {
                            let obj_temp3 = {
                                value: qu,
                                label: qu,
                            }
                            temp_list.push(obj_temp3)
                        })
                        list.forEach((sheng) => {
                            sheng.children.forEach((shi) => {
                                if (shi.label == key_son)
                                    shi.children = temp_list
                            })
                        })
                    }
                }
                this.list = list
            },
            handleChange_fhd(e) {//发货地地区选择器 ,['省','市','区']
                this.form.delivery_province = e[0],// 发货省
                    this.form.delivery_city = e[1],//发货市
                    this.form.delivery_district = e[2]
                console.log(this.form)
            },
            handleChange_shd(e) {//收货地地区选择器 ,['省','市','区']
                this.form.receipt_province = e[0],// 发货省
                    this.form.receipt_city = e[1],//发货市
                    this.form.receipt_district = e[2]
                console.log(this.form)
            },
            search_fhd(e) {//搜索发货地地区选择器 ,['省','市','区']
                this.delivery_province = e[0],// 发货省
                    this.delivery_city = e[1],//发货市
                    this.deliver_district = e[2]
                // this.start = 0
                // this.end = 10
                // this.currentPage1 = 1//当前页码
                // this.pageSize = 10//每页数
                this.start = 0
                this.end = this.start + this.pageSize
                this.currentPage1 = 1//当前页码
            },
            search_shd(e) {//搜索收货地地区选择器 ,['省','市','区']
                this.receipt_province = e[0],// 发货省
                    this.receipt_city = e[1],//发货市
                    this.receipt_district = e[2]
                // this.start = 0
                // this.end = 10
                // this.currentPage1 = 1//当前页码
                // this.pageSize = 10//每页数
                this.start = 0
                this.end = this.start + this.pageSize
                this.currentPage1 = 1//当前页码
                console.log(this.form)
            },
            change_jjpl(e) {//家具品类change回调
                console.log(e)
                console.log(this.jjpl)
                this.form.furniture_category = this.jjpl.join(',');
            },
            getUEM() {//根据收货省市区获取价格因子
                this.request.get('/user/price/', {
                    params: {
                        province: this.form.receipt_province,
                        city: this.form.receipt_city,
                        district: this.form.receipt_district
                    }
                }).then(res => {
                    //获得价格银子存储起来
                    if (res.data.ret == 0) {
                        this.UEM = res.data.data
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.data
                        });
                    }
                })
            },
            calcPrice() {//计算价格
                this.$loading();
                const {u, m, e} = this.UEM
                let goods_volume = this.form.goods_volume
                let price;
                if (goods_volume * u > m) {
                    price = goods_volume * u + m + e
                } else {
                    price = m + e
                }
                this.$loading().close();
                this.form.transport_prices = price
            },
            submitEdit() {//提交修改表单
                console.log(this.form)
                let data = this.form;
                this.$loading();
                this.request.post('/admin/modify/', data).then(res => {
                    //获得价格银子存储起来
                    this.$loading().close()
                    if (res.data.ret == 0) {
                        this.$message({
                            type: 'success',
                            message: res.data.data
                        });
                        this.dialogVisible = false
                        this.search();
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.data
                        });
                    }
                })
            },
            handleCommand(command) {//登出
                if (command == 'logout') {
                    this.logout()
                }
            },
            resetAll() {//重置所有搜索条件
                this.order_number = '';//	根据订单号查询
                this.order_state = '';//	根据订单状态查询   1:已下单  2:已提货  3:已完成  4:已取消
                this.gte = '';//	查询大于等于该日期的订单   格式:”2020/05/18”
                this.lte = '';//	查询小于等于该日期的订单   格式同gte
                this.consigner_phone = '';//	根据发货人手机查询订单
                this.delivery_province = '';//根据发货省查询订单
                this.delivery_city = '';//	根据发货市查询订单
                this.deliver_district = '';//根据发货区查询订单
                this.consignee_phone = '';//	根据收货人手机查询订单
                this.receipt_province = '';//	根据收货省查询订单
                this.receipt_city = '';//	根据收货市查询订单
                this.receipt_district = '';//	根据收货区查询订单
                this.s_fhd = '';
                this.s_shd = '';
                this.start = 0
                this.end = this.start + this.pageSize
                this.currentPage1 = 1//当前页码
                this.search();
            },
            //分页相关方法
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.start = 0;
                this.end = this.start + val;
                this.search();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.end = this.pageSize * this.currentPage1
                this.start = this.pageSize * (this.currentPage1 - 1)
                this.search();
            },
            search_condition_onchange(e) {
                // this.start = 0
                // this.end = 10
                // this.currentPage1 = 1//当前页码
                // this.pageSize = 10//每页数
                // debugger
                this.start = 0
                this.end = this.start + this.pageSize
                this.currentPage1 = 1//当前页码
            },
            exportByConditions() {//按条件导出

            },
            exportBySelected() {//按选中导出
                let list = this.orderNumberList;
                if (list.length > 0) {
                    let data = {"order_number": list}
                    // this.$loading();
                    this.request({
                        method: 'GET',
                        url: '/admin/exportbyordernumber/',
                        params: {
                            order_number: JSON.stringify(data)
                        },
                        responseType: 'arraybuffer'
                    }).then(res => {
                        console.log(res)
                        let blob = new Blob([res.data], {type: "application/vnd.ms-excel"});
                        let url = window.URL.createObjectURL(blob);
                        window.location.href = url;
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '请至少选择一项！'
                    });
                }
            },
            handleSelectionChange(e) {
                let orderNumberList = [];
                if (e.length > 0) {//有选中项
                    e.forEach(item => {
                        orderNumberList.push(item.order_number)
                    })
                }
                console.log(orderNumberList)
                this.orderNumberList = orderNumberList;
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

    .fy-div {
        padding: 10px;
        text-align: center;
    }

    .portarit-div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>