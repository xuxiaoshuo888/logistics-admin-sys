<template>
    <div class="contain">
        <div class="form-div">
            <el-input
                    placeholder="请输入用户名"
                    suffix-icon="el-icon-date"
                    v-model="username"
                    name="username"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
            >
            </el-input>
            <el-input
                    placeholder="请输入密码"
                    suffix-icon="el-icon-date"
                    type="password"
                    auto-complete="on"
                    v-model="password">
            </el-input>
        </div>
    </div>
</template>

<script>
  export default {
    name: "login",
    data(){

    },
    methods:{
      login(){

      }
    }

  }
</script>

<style scoped>

</style>