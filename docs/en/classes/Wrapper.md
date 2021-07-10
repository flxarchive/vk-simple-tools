# Wrapper

In addition to vk-simple-tools, there is a simple VK API handler-Wrapper.

## Initialization
```js
const { Wrapper } = require('vk-simple-tools');

let vk = new Wrapper({ 
    token: 'your_token', 
    version: 'API_version'
}); 
```

> The version of the API to specify *optional*

> You can get a token [here](vkhost.github.io)

## Методы

### callMethod

Method for calling VK API methods. Arguments:
* **method** - API method, *string, required*
* **params** - parameters required for this API method, *object*

```js
async function run() {
    let response = await vk.callMethod('users.get', {
        user_ids: 1,
        fields: 'photo_max,followers_count'
    });

    console.log(response);
};

run().catch(console.log);
```
