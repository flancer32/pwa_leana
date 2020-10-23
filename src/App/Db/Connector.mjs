import $knex from 'knex';

/**
 * 'knex' based connector to relational database.
 */
export default class Fl32_Leana_App_Db_Connector {
    /** @type {Fl32_Leana_App_Config} */
    _config
    /** @type {Fl32_Leana_App_Logger} */
    _logger
    _knex

    /**  @param {Object} spec */
    constructor(spec) {
        this._config = spec.Fl32_Leana_App_Config$;
        this._logger = spec.Fl32_Leana_App_Logger$;
    }

    /**
     * Initialize connection to 'main' database.
     *
     * @returns {Promise<void>}
     */
    async init() {
        const spec = this._config.get('/local/db/main');
        const db = spec.connection.database + '@' + spec.connection.host;
        const user = spec.connection.user;
        try {
            this._knex = await $knex(spec);
            this._logger.info('Connected to DB \'' + db + '\' as \'' + user + '\'.');
        } catch (e) {
            this._logger.error('Cannot connect to DB \'' + db + '\' as \'' + user + '\'. Error: ' + e);
        }
    }

    /**
     * Start new knex transaction.
     *
     * @returns {Promise<*>}
     */
    async startTransaction() {
        return await this._knex.transaction();
    }
}
