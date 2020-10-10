export default class Fl32_Leana_App_Config {
    _store

    init(cfg) {
        this._store = cfg;
    }

    /**
     * Get configuration value by path (`path/to/the/node`).
     *
     * @param {string} cfgPath - Path to the node of the configuration tree (`path/to/the/node`).
     * @return {string|boolean|number|Object} - Configuration value.
     */
    get(cfgPath) {
        let result = this._store;
        const parts = cfgPath.split('/');
        for (const one of parts) {
            if (one) {
                if (result[one]) {
                    result = result[one];
                } else {
                    result = undefined;
                    break;
                }
            }
        }
        return result;
    }

    /**
     * Set configuration value by path (`path/to/the/node`).
     *
     * @param {string} cfgPath - Path to the node of the configuration tree (`path/to/the/node`).
     * @param {string|boolean|number|Object} data - Value to save into configuration tree.
     */
    set(cfgPath, data) {
        const parts = cfgPath.split('/');
        let current = this._store;
        let ndx = 1;
        for (const one of parts) {
            if (one) {
                if (!current[one]) {
                    current[one] = {};
                }
                if (ndx < parts.length) {
                    current = current[one];
                } else {
                    current[one] = data;
                }
            }
            ndx += 1;
        }
    }
}
