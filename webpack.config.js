const childProcess  = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'); 
const webpack = require('webpack');
require('dotenv').config();

// require : module을 불러오눈 명령어 - 어떤 가상머신 위에서도 다 돌아감. 운영체제에 따라서 경로를 설정하는 문법이 다르기때문에 'path'문법을 불러와서 사용합니다.


// 노드 JS문법 : 모듈을 밖으로 빼내자. 
// 엔트리, 아웃풋 그리고 번들링 모드를 설정할 수 있습니다.
// npx webpack --mode development --entry ./src/app.js -o ./dist
// 위으 명령어가 너무 길어서 단축어를 만들어볼게요.
module.exports = { 
    // --mode development
    mode: 'development',

    // --entry ./src/app.js
    entry: {
        main: path.resolve('./src/app.js') // 패스문법
    },

    //-o ./dist
    output: {
        // publicPath : 빌드 할 때 CSS나 HTML파일 안에 URL들을 업데이트 해줍니다.
        publicPath: 'Webpack/20231005-1/dist/',
        filename: '[name].js', // 대괄호 안에 파일이름 넣으면 됨
        path: path.resolve('./dist') // 패스모듈 사용한 문법으로  경로 설정 
    },

    module: {
        // 로더를 추가하는 장소입니다.
        rules: [
            // {
            //     test: /\.js$/, // 이 로더의 대상은 모든 js파일임 // js파일이 myloader의 item으로 들어감
            //     use: [
            //         path.resolve('./myLoader.js') // 이 로더의 위치
            //     ]
            // }, //하지만 이 로더를 주로 만들지는 않고여 보통 남들이 만들어 논거 씁니다.
            {
                test: /\.css$/, // 이 로더의 대상은 모든 css파일이다
                use: [
                    'style-loader', // 사용할 로더 이름 (html에 자스로부터 css 반영)
                    'css-loader' // 이 로더는 이것이다 (자스에 css import)
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset', // 이미지 크기 조정을 원한다면 /inline 을 빼줍니다.
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 기본단위는 kb입니다. 8-10kb 사이즈 이모티콘 수준의 img는 base64 포맷 (문자열)으로 갖고옵니다.
                        // > 브라우저가 이미지를 다운로드 받을 필요 없이 직접 그려버림
                        // 보통 내가 만든 결과물의 후처리를 위해서 사용됨 
                    } 
                }
            }
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `
            Commit Version : ${childProcess.execSync('git rev-parse --short HEAD')}
            Committer : ${childProcess.execSync('git config user.name')} 
            마지막 빌드 시간 : ${new Date().toLocaleString()}
            `
        }),
        new webpack.DefinePlugin({
            // pw: 123455,
            // webpack에서 제공하는 플러그인이 있으면 리액트가 굳이 필요하지 않을 수도 있다.
            // Define plugin은 다른 데서도 사용 가능해요.
            //개발 환경에 따라 서로다른 환경변수를 제공할 수도 있습ㄴ니ㅏ. 개발자가 백엔드 개발자한테  api주소를 요청하잖아요 그때 요청하는 apiㅇ도 개발버전이 있고 실제 서비스 리얼타임 으로 돌아갈때 사용한느 api갇 ㅏ르게 관리하는데 그런 상황을 모방해서 만든 예시라고 보시면 되겠습니다. div: / pro
            dev: JSON.stringify(process.env.DEV_API),
            pro: JSON.stringify(process.env.PRO_API)
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}