const fetch = require('node-fetch');
const { vkToolsError, VKAPIError } = require('./errors');
const querystring = require('querystring');

class Wrapper {
    /**
     * @constructor
     * @param {String} token Токен ВКонтакте
     * @param {String} version Версия АПИ
     */
    constructor({
        token = null, 
        version = '5.131'
    }) {
        this.accessToken = token;
        this.v = version;

        if (this.accessToken == null) throw new vkToolsError('\u001B[41m ERROR \u001B[0m Параметр `token` обязателен для работы.');
    };

    /**
     * @async
     * @param {String} method Метод АПИ
     * @param {Object} params Требуемые параметры метода
     */
    async callMethod(method, params = {}) {
        if (!method) throw new vkToolsError('\u001B[41m ERROR \u001B[0m Параметр `method` обязателен для выполнения метода.');
        if (typeof method !== 'string') throw new vkToolsError('\u001B[41m ERROR \u001B[0m Параметр `method` обязателен для выполнения метода.');

        const parameters = {
            access_token: this.accessToken,
            v: this.v,
            ...params
        };        

        let response = await fetch(`https://api.vk.com/method/${method}?${querystring.stringify(parameters)}`);
        response = await response.json();

        if (typeof response.error !== 'undefined') throw new VKAPIError('\u001B[41m ERROR \u001B[0m ' + response.error.error_code, response.error.error_msg);

        return response.response;
    };
};

module.exports = Wrapper;