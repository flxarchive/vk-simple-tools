const { vkTools } = require('vk-simple-tools');

let vk = new vkTools({
    token: process.env.token, // ваш токен
    userId: process.env.id, // ваш айди
    messageMode: false // отправляются ли логи о работе бота в ЛС (принимает значение true/false)
});

vk.setStatus('https://npm.im/vk-simple-tools');

vk.getStickers(1);
