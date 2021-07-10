# vkTools

vkTools - is the main class of the module, all methods are found here

## Initialization
```js
const { vkTools } = require('vk-simple-tools');

let vk = new vkTools({
    token: 'your_token',
    userId: your_id,
    messageMode: true/false (are logs about the bot's work sent to the MSG`s)
}); 

vk.configure();
```

> You can get a token [here](vkhost.github.io)

## Методы

### configure 

An important parameter for starting the bot, without it work is impossible

```js
vk.configure();
```

### endlessOnline

Eternal online, does not require any arguments.

```js
vk.endlessOnline();
```

### setStatus

Setting the status (once). The required text argument is the status text.

```js
vk.setStatus('Cool!');
```

### setAutoStatus

Autostatus, updated every minute. Parameters:
* **lang** - status language, default Russian, *string, en or ru*
* **language** - programming language (type: yes)
* **groupId** - if present, the status will be set and updated in the group with the specified ID, *number*
* **currentDate** - set the current date, *number, 1 or 0*
* **currentTime** - set the current time, *number, 1 or 0*
* **subscribers** - number of subscribers, *number, 1 or 0*
* **avatarLikes** - number of likes on the avatar, does not work in groups, *number, 1 or 0*

> All parameters are optional

```js
vk.setAutoStatus({
    lang: 'en',
    currentTime: 1,
    subscribers: 1,
    avatarLikes: 1
});
```

### getStickers

Get user stickers. Required argument text-user ID.
The VK ME token is required for this method to work (an error occurs when using a third-party token and the script does not run)

```js
vk.getStickers(1);
```
