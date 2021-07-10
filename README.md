# vk-simple-tools

vk-simple-tools - a [JavaScript](https://learn.javascript.ru/) tools package for [VK](https://vk.com/).

<div align='center'>
  <a href='https://github.com/filatovpr/vk-simple-tools/tree/main/docs'><b>📚 Documentation</b></a>
  <span>&nbsp;•&nbsp;</span>
  <a href='https://github.com/filatovpr/vk-simple-tools/tree/main/examples'><b>📝 Examples</b></a>
  <span>&nbsp;•&nbsp;</span>
  <a href='https://t.me/vktools_channel'><b>🙋‍♂ Channel</b></a>
</div>

## Install
### YARN
```
yarn add vk-simple-tools
```
### NPM
```
npm i vk-simple-tools
```

## Example usage
```js
const { vkTools } = require('vk-simple-tools');

let vk = new vkTools({
    token: process.env.token,
    userId: process.env.id,
    messageMode: false
});

vk.setStatus('https://npm.im/vk-simple-tools');
```
