/**
 * Application's web server.
 */
// NODE.JS IMPORTS
import $cookieParser from 'cookie-parser';
import $express from 'express';
import $path from 'path';
import $serveStatic from 'serve-static';

// MODULE'S EXPORT
export default class Fl32_Leana_App_Server {
    /** @type {Fl32_Leana_App_Config} */
    _config
    /** @type {Fl32_Leana_App_Logger} */
    _logger
    _server = $express();


    constructor(spec) {
        this._config = spec.Fl32_Leana_App_Config$;
        this._logger = spec.Fl32_Leana_App_Logger$;
    }

    async init() {
        const me = this;
        // setup order is important
        this._server.use($cookieParser());
        this._server.use($express.json({limit: '50mb'}));
        // API routes
        // static resources
        const pathRoot = this._config.get('path/root');
        const pathPub = $path.join(pathRoot, 'pub');
        this._server.use($serveStatic(pathPub));
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
