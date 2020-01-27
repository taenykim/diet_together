module.exports = {
    distDir = '.next',
    webpack(config){
        // console.log('config', config) 넥스트 환경
        // console.log('rules', config.module.rules[0]) 요기에 바벨로더 이런거 들어있음(최신문법 써주게하는)
        const prod = process.env.NODE_ENV === 'production'
        return {
            ...config,
            mode : prod?'production':'development',
            devtool:prod?'hidden-source-map':'eval'
        }
    }
}