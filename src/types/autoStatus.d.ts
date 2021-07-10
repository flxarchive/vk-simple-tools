interface AutoStatusParams {
    /**
     * Язык статуса
     */
    lang?: string,

    /**
     * Язык программирования (типо крутой)
     */
    language?: string,

    /**
     * Если установлено, то автостатус будет установлен в группу
     */
    groupId?: number,

    /**
     * Установить текущую дату
     */
    currentDate?: boolean,

    /**
     * Установить текущее время
     */
    currentTime?: boolean,

    /**
     * Установить количество подписчиков
     */
    subscribers?: boolean,

    /**
     * Установите количество лайков на аватарке
     */
    avatarLikes?: boolean
};

export = AutoStatusParams;