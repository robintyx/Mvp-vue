module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended', // 推荐规范
    'plugin:prettier/recommended', //这样写，让pettier的规则，放在eslint规则扩展中，于是会经由eslint报错
    './scaffold-config/.eslint-global-variables.json',
  ],
  parserOptions: {
    ecmaVersion: 12,
    // 代码模块类型，可选script(默认)，module
    sourceType: 'module',
  },
  globals: {
    AMap: 'readonly',
    __dirname: 'readonly',
    process: 'readonly',
  },
  rules: {
    // "off" 或 0：关闭规则
    // "warn" 或 1：开启规则，warn级别的错误 (不会导致程序退出)
    // "error" 或 2：开启规则，error级别的错误(当被触发的时候，程序会退出)
    // 'prettier/prettier': 'error'
    // 解决ESLint和Prettier的switch/case缩进冲突
    // indent: ['error', 2, { SwitchCase: 1 }],
    // vite打包时自动去除console和debugger,所以这里直接关掉检查
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-v-model-argument': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'vue/multi-word-component-names': 'off', // 关闭组件名需要多个单词组成的规则
    'no-unused-vars': 1, // 已声明但未在代码中任何地方使用的变量
    'no-control-regex': 2, //正则表达式中不允许出现控制字符
    'no-dupe-args': 2, //函数定义的时候不允许出现重复的参数
    'no-dupe-keys': 2, //对象中不允许出现重复的键
    'no-duplicate-case': 2, //switch语句中不允许出现重复的case标签
    'no-redeclare': 2, //不允许变量重复声明
    'no-shadow-restricted-names': 2, //js关键字和保留字不能作为函数名或者变量名
    'comma-style': [2, 'last'], //逗号风格
    'no-multiple-empty-lines': [
      2,
      {
        // 禁止多个空行
        max: 1,
      },
    ],
    'space-before-blocks': [2, 'always'], // 不要存在多余的块空间
    'no-const-assign': 2, // 禁止修改使用const声明的变量
  },
}
