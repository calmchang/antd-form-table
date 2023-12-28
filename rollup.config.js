import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve';// 帮助寻找node_modules里的包
import commonjs from '@rollup/plugin-commonjs';// 将非ES6语法的包转为ES6可用
import path from 'path';
import jsx from 'rollup-plugin-jsx'
import {terser} from 'rollup-plugin-terser';


// node 10.15.0
const projectRootDir = path.resolve(__dirname,'src');
console.warn('===============projectRootDir============',projectRootDir)


const GLOBALS = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'reactRouterDom',
  'prop-types': 'PropTypes',
  formik: 'formik',
  'lodash/throttle': 'throttle',
  'react-number-format': 'NumberFormat',
  'react-ga': 'ReactGA',
  'react-dates': 'ReactDates',
  'styled-components': 'styled',
  'react-tag-autocomplete': 'ReactTags',
  'react-spinkit': 'Spinner',
  'react-select': 'Select',
  '@fortawesome/fontawesome-svg-core': 'fontawesomeSvgCore',
  '@fortawesome/react-fontawesome': 'reactFontawesome',
  '@fortawesome/pro-regular-svg-icons': 'proRegularSvgIcons',
  '@fortawesome/free-brands-svg-icons': 'freeBrandsSvgIcons',
  '@fortawesome/pro-solid-svg-icons': 'proSolidSvgIcons',
  'js-uuid':'js-uuid2'
};

export default{
    input:{
      'index':'src/index.jsx', 
    },
    external:['react','react-dom','antd'], // 告诉rollup，不打包react;将其视为外部依赖
    output:[
      // {
      //   entryFileNames:'[name].js',
      //   format:'umd',
      //   dir:"umd",
      //   sourcemap: true,
      //   name:"uui"
      // },
      {
        entryFileNames:'[name].js',
        format:'cjs',
        dir:"lib",
        sourcemap: true,
        globals: GLOBALS
      },
    ],
    plugins:[
      resolve(),
      jsx({factory:'React.createElement'}),
      babel({
          exclude:'node_modules/**',
          babelHelpers: 'runtime',
          // presets:['@babel/env','@babel/preset-react']
      }),
      commonjs({
        extensions: ['.js', '.cjs','.jsx'],
        transformMixedEsModules: true
      }),
      terser()
      

    ]
};