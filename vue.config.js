// const target = 'http://129.204.106.247:12331';//测试地址
const target = 'https://jytc.tech:12330 ';//正式地址


module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/all.scss";`
            }
        }
    },
    devServer: {
        open: true,
        port: 8888,
        disableHostCheck: true,
        proxy: {
            '/proxy': {
                target: target,
                changeOrigin: true,
                pathRewrite: {
                    '^/proxy': ''
                }
            },
        }
    },
    lintOnSave: false // 取消 eslint 验证
};