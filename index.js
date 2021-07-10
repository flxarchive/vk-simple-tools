const Wrapper = require('./src/wrapper');
const emojify = require('./src/emojify');

class vkTools {
    /**
     * @param token Токен ВКонтакте
     * @param userId Айди пользователя ВКонтакте
     * @param messageMode Отправляет ли бот сообщения в лс пользователя или в консоль
     */
    constructor({
        token = null,
        userId = null,
        messagesMode = false
    }) {
        this.vkAPI = new Wrapper({
            token: token,
            version: '5.131'
        });
        this.userId = userId;
        this.msgMode = messagesMode;
    }
    /**
     * Проверка бота на указанность всех параметров
     */
    async configure() {
        if(!this.vkAPI) throw new Error('\u001B[41m ERROR \u001B[0m Параметр `token` отсутствует!');
        if(!this.userId) throw new Error('\u001B[41m ERROR \u001B[0m Параметр `userId` отсутствует!');
    };

    /**
     * Вечный онлайн
     */
    async endlessOnline() {
        await this.vkAPI.callMethod('account.setOnline');

        setTimeout(async() => {
            await this.endlessOnline();
            if(this.vkAPI != null && this.userId != null) console.log('\u001B[42m  OK  \u001B[0m Вечный онлайн обновлен!');
            if(this.msgMode == true) this.vkAPI.callMethod('messages.send', { message: `[ OK ] Вечный онлайн обновлен!`, user_id: this.userId, random_id: 0 });
        }, 300000);
    };

    /**
     * Установить новый статус
     * @param {String} text Текст статуса 
     */
    async setStatus(text) {
        if (!text) throw new VToolsError('\u001B[41m ERROR \u001B[0m Текст отсутствует');

        await this.vkAPI.callMethod('status.set', {
            text: text
        });
        if(this.vkAPI != null && this.userId != null) console.log('\u001B[42m  OK  \u001B[0m Статус был успешно изменен');
        if(this.msgMode == true) this.vkAPI.callMethod('messages.send', { message: `[ OK ] Статус был успешно изменен`, user_id: this.userId, random_id: 0 });
    };

    /**
     * Узнать кол-во стикеров и названия стикеров пользователя. Токен VK ME.
     * @param {String} text Айди пользователя
     */
    async getStickers(text) {
        if(!text) throw new VToolsError('\u001B[41m ERROR \u001B[0m Отсутствует айди пользователя')

        let gifts = await this.vkAPI.callMethod('gifts.getCatalog', {
            user_id: text
        });
        let spisok = gifts.find(x => x.name == "stickers").items.filter(x => Boolean(x.sticker_pack)).filter(x => Boolean(x.disabled)).map(x => ` ${x.sticker_pack.title}`);
        
        if(this.vkAPI != null && this.userId != null) console.log(`\u001B[42m  OK  \u001B[0m Список платных наборов этого пользователя (${spisok.length} шт):${spisok}`)
        if(this.msgMode == true) this.vkAPI.callMethod('messages.send', { message: `[ OK ] Список платных наборов этого пользователя (${spisok.length} шт):${spisok}`, user_id: this.userId, random_id: 0 });
    }

    /**
     * Авто-статус
     * @param {Object} params Параметры статуса
     * @param {String} params.lang Язык статуса
     * @param {String} params.language Язык програмирования (типо крутой)
     * @param {Number} params.groupId Если установлено, то автостатус будет установлен в группу
     * @param {Boolean} params.currentDate Установить текущую дату
     * @param {Boolean} params.currentTime Установить текущее время
     * @param {Boolean} params.subscribers Установить количество подписчиков
     * @param {Boolean} params.avatarLikes Установите количество лайков на аватарке
     */
    async setAutoStatus(params = {}) {
        if (!params.lang) params.lang = 'ru';
        if (params.lang !== 'en' && params.lang !== 'ru') throw new VToolsError("\u001B[41m ERROR \u001B[0m Параметр `lang` принимает значение 'ru' или 'en'");

        let text = '';

        if (params.currentDate) {
            let day = emojify(new Date().getDate());
            let month = emojify(new Date().getMonth());
            let year = emojify(new Date().getFullYear());

            text += `📆 ${params.lang == 'ru' ? 'Дата:' : 'Date:'} ${day}\.${month}\.${year} | `;
        };

        if (params.currentTime) {
            let hours = emojify(new Date().getHours());
            let minutes = emojify(new Date().getMinutes());

            text += `⏰ ${params.lang == 'ru' ? 'Время:' : 'Time:'} ${hours}\:${minutes} | `;
        };

        if (params.groupId) {
            if (params.groupId < 0) params.groupId = -params.groupId;

            let groupInfo = await this.vkAPI.callMethod('groups.getById', {
                group_id: params.groupId,
                fields: 'members_count'
            });

            if (params.subscribers) {
                text += `👥 ${params.lang == 'ru' ? 'Подписчиков:' : 'Subscribers:'} ${groupInfo[0].members_count}`;
            };

            await this.vkAPI.callMethod('status.set', {
                text: encodeURIComponent(text),
                group_id: params.groupId
            });    
        } else {
            let userInfo = await this.vkAPI.callMethod('users.get', {
                fields: 'followers_count,photo_id'
            });

            if (params.avatarLikes) {                
                if (typeof userInfo[0].photo_id === 'undefined') throw new VToolsError(`\u001B[43m WARNING \u001B[0m У текущего пользователя нет аватарки.`);

                let userPhotoInfo = await this.vkAPI.callMethod('photos.getById', {
                    photos: userInfo[0].photo_id,
                    extended: 1
                });

                text += `💌 ${params.lang == 'ru' ? 'На аве:' : 'On avatar:'} ${userPhotoInfo[0].likes.count} ❤ | `
            };

            if (params.subscribers) {
                text += `👥 ${params.lang == 'ru' ? 'Подписчиков:' : 'Subscribers:'} ${userInfo[0].followers_count} | `;
            };

            if(params.language) {
                text += `Язык программирования: ${params.lang == 'ru' ? 'Подписчиков' : 'Subscribers'}`
            };

            await this.vkAPI.callMethod('status.set', {
                text: encodeURIComponent(text)
            });
        };

        setTimeout(async () => {
            await this.setAutoStatus(params);
            if(this.vkAPI != null && this.userId != null) console.log('\u001B[42m  OK  \u001B[0m Автостатус обновлён!')
            if(this.msgMode == true) this.vkAPI.callMethod('messages.send', { message: `[ OK ] Автостатус обновлён!`, user_id: this.userId, random_id: 0 });
        }, 60000);
    };
};

module.exports = { vkTools, Wrapper };