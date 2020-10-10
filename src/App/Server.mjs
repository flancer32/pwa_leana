/**
 * Application's web server.
 */
// NODE.JS IMPORTS
import $express from 'express';
import $cookieParser from 'cookie-parser';

// MODULE'S EXPORT
export default class Fl32_Leana_App_Server {
    /** @type {Fl32_Leana_App_Logger} */
    _logger
    _server = $express();


    constructor(spec) {
        this._logger = spec.Fl32_Leana_App_Logger$;
    }

    async init() {
        const me = this;
        // setup order is important
        this._server.use($cookieParser());
        this._server.use($express.json({limit: '50mb'}));
        // routes
        // default route
        this._server.all('*', function (req, res) {
            me._logger.debug(`${req.method} ${req.url}`);
            // COMPOSE RESULT
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({response: 'default route'}));
        });
    }

    /**
     * Run web server.
     *
     * @param {number} port
     * @param {Function} callable
     */
    async listen(port, callable) {
        await this._server.listen(port, callable);
    }

}
