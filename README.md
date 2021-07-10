# vk-simple-tools

vk-simple-tools - a [JavaScript](https://learn.javascript.ru/) tools package for [VK](https://vk.com/).

| 📚 [Documentation](docs/) | 📝 [Examples](examples/) |
| ------------------------ | ------------------------ |

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
