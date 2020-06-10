const target = 'http://192.168.0.184:8050';
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
    }
};