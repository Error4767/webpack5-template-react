const basePresets = [[
  "@babel/preset-react",
  {
    // "pragma": "dom", // default pragma is React.createElement (only in classic runtime)
    // "pragmaFrag": "DomFrag", // default is React.Fragment (only in classic runtime)
    // "throwIfNamespace": false, // defaults to true
    "runtime": "automatic", // defaults to classic
    "importSource": "react" // react17(react) | react17-(custom-jsx-library)
  }
]];

const basePlugins = [
  [ // 按需导入 antd，antd 还需要在代码中导入其动画库 antd/lib/style/index.css
    'babel-plugin-import',
    {
      libraryName: 'antd',
      style: "css"
    }
  ]
];

module.exports = (process.env.NODE_ENV === "development" ? {
  // 开发环境
  "presets": [...basePresets],
  "plugins": [
    "react-refresh/babel",// 所需的热更新模块
    ...basePlugins
  ]
} : {
  "presets": ["@babel/preset-env", ...basePresets],
  "plugins": [
    ...basePlugins
  ]
});