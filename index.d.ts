import AutoStatusParams from './src/types/autoStatus';

export class vkTools {
    /**
     * @param token Токен ВКонтакте
     * @param userId Айди пользователя ВКонтакте
     * @param messageMode Отправляет ли бот сообщения в лс пользователя или в консоль
     */
    constructor(token: string, userId: number, messageMode: boolean);

    /**
     * Проверка бота на указанность всех параметров
     */
    async configure(): Promise<void>;

    /**
     * Вечный онлайн
     */
    async endlessOnline(): Promise<void>;

    /**
     * 
     * @param text Текст статуса 
     */
    async setStatus(text: string): Promise<void>;

    /**
     * 
     * @param params Параметры статуса
     */
    async setAutoStatus(params: AutoStatusParams): Promise<void>;

    /**
     * 
     * @param text Айди пользователя
     */
    async getStickers(text: string): Promise<void>;
};

export class Wrapper {
    /**
     * @param token Токен ВКонтакте
     * @param version Версия АПИ
     */
    constructor(token: string, version?: string);

    /**
     * @param method Метод АПИ
     * @param params Требуемые параметры метода
     */
    async callMethod(method: string, ...params: any[]): Promise<object>;
};

export default vkTools;