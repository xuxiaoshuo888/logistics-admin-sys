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
                        title="修改订单"
                        :visible.sync="dialogVisible"
                        width="70%"
                        :before-close="handleClose">
                    <div class="dialog-content">
                        <el-form ref="form" :model="form" label-width="100px">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <!--
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
                                    -->
                                    <el-form-item label="订单号">
                                        <el-input v-model="form.order_number" disabled></el-input>
                                    </el-form-item>
                                    <el-form-item label="发货人">
                                        <el-input v-model="form.consigner"></el-input>
                                    </el-form-item>
                                    <el-form-item label="发货人电话">
                                        <el-input v-model="form.consigner_phone" type="number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="发货省市区">
                                        <el-cascader
                                                v-model="value"
                                                :options="options"
                                                @change="handleChange"></el-cascader>
                                    </el-form-item>
                                    <el-form-item label="发货地址">
                                        <el-input type="textarea" v-model="form.delivery_address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="收货人">
                                        <el-input v-model="form.consignee"></el-input>
                                    </el-form-item>
                                    <el-form-item label="收货人电话">
                                        <el-input v-model="form.consignee_phone" type="number"></el-input>
                                    </el-form-item>
                                    <el-form-item label="收货省市区">
                                        <!--                                        <el-input v-model="form.order_number"></el-input>-->
                                    </el-form-item>
                                    <el-form-item label="收货地址">
                                        <el-input type="textarea" v-model="form.receipt_address"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="家具类别">
                                        <el-checkbox-group v-model="form.furniture_category">
                                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                    <el-form-item label="货物件数">
                                        <el-input-number v-model="form.goods_number" @change="handleChange" :min="1"
                                                         label="描述文字"></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="货物体积(m³)">
                                        <el-input-number v-model="form.goods_volume" @change="handleChange" :min="0.1"
                                                         :step="0.1" label="描述文字"></el-input-number>
                                    </el-form-item>
                                    <el-form-item label="运输价格">
                                        <el-input type="textarea" v-model="form.transport_prices"></el-input>
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
            <el-button type="primary" @click="dialogVisible = false" size="small">提交修改</el-button>
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
                deli_method_list: [
                    {name: '自提', val: '1'},
                    {name: '送货到楼下', val: '2'},
                    {name: '送货到家', val: '3'},
                    {name: '送货并安装', val: '4'}
                ],
                pay_method_list: [
                    {name: '现付', val: '1'},
                    {name: '转账', val: '2'},
                    {name: '到付', val: '3'}
                ],
                form: {
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
                },
                value: [],
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }, {
                        value: 'daohang',
                        label: '导航',
                        children: [{
                            value: 'cexiangdaohang',
                            label: '侧向导航'
                        }, {
                            value: 'dingbudaohang',
                            label: '顶部导航'
                        }]
                    }]
                }, {
                    value: 'zujian',
                    label: '组件',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }, {
                    value: 'ziyuan',
                    label: '资源',
                    children: [{
                        value: 'axure',
                        label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                        value: 'jiaohu',
                        label: '组件交互文档'
                    }]
                }]
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
            edit(e) {
                console.log(e)
                this.dialogVisible = true
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