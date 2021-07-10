# Wrapper

В дополнение к vk-simple-tools идёт простейший обработчик VK API - Wrapper.

## Инициализация
```js
const { Wrapper } = require('vk-simple-tools');

let vk = new Wrapper({
    token: 'ваш_токен',
    version: 'версия_API'
}); 
```

> Версию API указывать *необязательно*

> Получить токен можно [здесь](vkhost.github.io)

## Методы

### callMethod

Метод для вызова методов VK API. Аргументы:
* **method** - метод API, *строка, обязательный*
* **params** - параметры, необходимые для данного метода API, *объект*

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
