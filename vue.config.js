const webpack = require("webpack");
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: config => {

        console.log(__dirname);
        config.resolve.alias
            .set('@', resolve('src'))
            //.set('mui', path.resolve(__dirname, './src/assets/js/mui.js'))

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

    },
    // devServer:{type:Object} 3个属性host,port,https
    // 它支持webPack-dev-server的所有选项
    devServer: {
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/': {
                target: `http://192.168.8.118/`,
                changeOrigin: true,
                // pathRewrite: {
                //     '^/' : ''
                // }
            }
        }
    },
    //configureWebpack 是Vue CLI3.0 中用于配置 webpack 插件参数的地方，你在这里设置，会新建或者覆盖 webpack 默认配置。
    //webpack ProvidePlugin 的含义是创建一个全局的变量，使这个变量在 webpack 各个模块内都可以使用。这里的配置含义是创建 '$'、'jQuery'、'window.jQuery' 三个变量指向 jquery 依赖，创建 'Popper' 变量指向 popper.js 依赖。
    // configureWebpack: {
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             $: 'jquery',
    //             jQuery: 'jquery',
    //             // mui: "mui",
    //             'window.jQuery': 'jquery',
    //             // "window.mui": "mui",
    //             // Popper: ['popper.js', 'default']
    //         })
    //     ]
    // },
    // configureWebpack: config => {
    //     require('vux-loader').merge(config, {
    //         options: {},
    //         plugins: ['vux-ui']
    //     })
    // },
    transpileDependencies: ['vue-echarts', 'resize-detector'],
    //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
    lintOnSave: true,
    // css: {
    //     requireModuleExtension: true,
    //     sourceMap: true,
    //     loaderOptions: {
    //         scss: {
    //             prependData: '@import "~@/styles/variables.scss";',
    //         },
    //     },
    // },
    // css: {
    //     loaderOptions: {
    //         postcss: {
    //             plugins: [
    //                 require("postcss-px-to-viewport")({
    //                     rootValue: 32, // 换算的基数(设计图750的根字体为32)
    //                     unitToConvert: 'px', //将要转化的单位
    //                     viewportWidth: 375,
    //                     // viewportHeight: 1334,
    //                     unitPrecision: 3,
    //                     viewportUnit: "vw",
    //                     selectorBlackList: [
    //                         ".ignore",
    //                         ".hairlines"
    //                     ],
    //                     minPixelValue: 1,
    //                     mediaQuery: false
    //                 }),
    //                 require("autoprefixer")({
    //                     overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8']
    //                 }),
    //
    //             ]
    //         }
    //     }
    // },
};
