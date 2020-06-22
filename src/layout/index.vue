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
                                    type="tel"
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
                        width="80%"
                        :before-close="handleClose">
                    <div class="dialog-content">
                        <el-form ref="form" :model="form" label-width="100px">
                            <el-row :gutter="20">
                                <el-col :span="12">
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
                                                style="width: 100%;"
                                                v-model="value_fhd"
                                                :options="list"
                                                @change="handleChange_fhd"></el-cascader>
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
                                        <el-cascader
                                                style="width: 100%;"
                                                v-model="value_shd"
                                                :options="list"
                                                @change="handleChange_shd"></el-cascader>
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
  import arealist from './area'

  export default {
    name: "layout",
    data() {
      return {
        arealist: arealist,
        list: [],//
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
        dialogVisible: false,
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
        value_fhd: '',
        value_shd: ''
      }
    },
    mounted() {
      //处理地区数据格式
      this.formatArealist();
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
        this.form.goods_number = e.goods_number;
        this.form.goods_volume = e.goods_volume;
        this.form.transport_prices = e.transport_prices;
        this.form.delivery_method = e.delivery_method;
        this.form.pay_method = e.pay_method;
        this.value_fhd = this.form.delivery_province + '/' + this.form.delivery_city + '/' + this.form.delivery_district
        this.value_shd = this.form.receipt_province + '/' + this.form.receipt_city + '/' + this.form.receipt_district
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